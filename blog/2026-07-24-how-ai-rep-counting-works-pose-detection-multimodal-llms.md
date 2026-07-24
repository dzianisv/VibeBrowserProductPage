---
title: "How AI Rep Counting Works: Pose Detection + Multimodal LLMs"
description: "How an AI rep counter actually works: on-device pose detection extracts joint keypoints, a joint-angle state machine counts reps, and a multimodal LLM watches the annotated video to correct form. The pipeline, the tradeoffs, and the honest limits."
date: "2026-07-24"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - "AI Fitness"
  - "Pose Detection"
  - "Computer Vision"
  - "Multimodal LLM"
  - "On-Device ML"
  - "Rep Counter"
published: true
---

"AI rep counter" and "AI form check" sound like marketing until you try to build one. Then you hit the real question: how does a phone actually know you did eight reps, and how does it know rep six was sloppy? The answer is two different systems doing two different jobs — a fast, deterministic computer-vision layer that counts, and a slower, multimodal language model that critiques. Confusing the two is where most "AI fitness" apps go wrong.

This is a technical walkthrough of how AI form correction actually works, grounded in how we built [Kinetic AI Fitness Coach](https://github.com/dzianisv/KineticAiCoach/releases/latest/download/kinetic-ai-coach.apk). No magic, no invented accuracy numbers — just the pipeline and its tradeoffs.

## The two-layer problem

Counting reps and correcting form feel like the same task. They aren't.

- **Counting** is a geometry problem. It's periodic motion — up, down, up, down — and you can detect it deterministically from body angles. It needs to be cheap, run in real time, and never phone home for every frame.
- **Form correction** is a judgment problem. "Your knees are caving in" or "you're not hitting depth" requires understanding *context* — the exercise, the intent, what good technique looks like. That's a reasoning task, and it's what multimodal LLMs are good at.

So the architecture splits: pose detection + a state machine to count, a multimodal LLM to coach. Let's take each layer in turn.

## Layer 1: pose estimation and keypoints

Everything starts with **pose detection**. A pose model takes a camera frame and returns a set of *keypoints* — coordinates for your shoulders, elbows, wrists, hips, knees, ankles, and so on. The common on-device option is Google's ML Kit Pose Detection, which returns 33 landmarks per frame, each with an x/y position (and a rough z-depth) plus a confidence score.

Kinetic runs this **on-device**. That matters for three reasons:

1. **Latency.** You need the skeleton overlaid on the live camera feed with no perceptible lag. A round-trip to a server per frame can't do that.
2. **Cost.** Streaming raw video to a cloud model at 30fps is expensive and pointless when the geometry is computable locally.
3. **Privacy.** The continuous video stream never leaves the phone. Only a small, selective slice goes to the cloud later, and only for the coaching step.

The visible product of this layer is the **live skeleton overlay** — in Kinetic, a red skeleton drawn on a Compose Canvas over your camera feed. It's not just eye candy. It's your proof that the app sees your body correctly. If the skeleton is jittering or attaching your elbow to the wall behind you, the count downstream will be garbage, and you can see that instantly.

A few honest realities about keypoints:

- **Confidence varies.** Low light, baggy clothes, or a limb occluded behind your torso all drop landmark confidence. Good pipelines gate on confidence and smooth noisy points rather than trusting every frame.
- **2D is lossy.** Most on-device pose is essentially 2D with weak depth. A squat filmed straight-on hides how far your hips travel. Camera angle is a real variable, not a detail.
- **It's per-frame.** The model has no memory. It doesn't know you're mid-squat. Turning a stream of skeletons into "a rep" is the next layer's job.

## Layer 2: rep detection with a joint-angle state machine

Here's the part people imagine is AI but mostly isn't. Once you have keypoints, counting a rep is a **state machine over joint angles**.

Take a squat. The signal that matters is knee flexion — the angle at the knee formed by hip → knee → ankle. You compute it with basic trig from the three keypoints:

```
angle = atan2(ankle.y - knee.y, ankle.x - knee.x)
      - atan2(hip.y - knee.y,   hip.x - knee.x)
```

Standing, that angle is wide (near straight). At the bottom of a squat, it's sharp. Now define two thresholds and two states:

- **UP** — knee angle above the "standing" threshold.
- **DOWN** — knee angle below the "bottom" threshold.

A rep is one full transition: UP → DOWN → UP. You increment the counter on the return to UP, not on the way down, so a half-rep that never reaches depth doesn't score. Each exercise has its own joint of interest — elbow angle for curls and push-ups, hip angle for deadlifts, and so on.

Why a state machine instead of "an AI model"? Because it's:

- **Deterministic.** The same motion always produces the same count. No hallucinated reps.
- **Cheap.** It's a handful of arithmetic operations per frame.
- **Debuggable.** When it miscounts, you can look at the angle trace and see exactly why.

The hard parts are all in the details:

- **Hysteresis.** If your UP and DOWN thresholds are the same value, small wobbles near the boundary double-count. You need a gap between them (enter DOWN at one angle, require a clearly higher angle to re-enter UP) so noise doesn't trigger phantom reps.
- **Debouncing.** Ignore transitions that happen impossibly fast — that's jitter, not a rep.
- **Partial reps.** Deciding whether a shallow squat "counts" is a product decision, not a math one. Kinetic's stance is that reps you didn't actually complete shouldn't inflate your numbers.

This layer is where the real "does it count my reps right" experience is won or lost, and almost none of it is an LLM.

## Layer 3: where multimodal LLMs actually earn their place

If the state machine counts, what's the AI for? **Form feedback and rep verification** — the judgment layer.

A joint-angle threshold can tell you the knee bent. It can't tell you your lower back rounded, your weight shifted onto your toes, or that your left and right sides are moving asymmetrically. Encoding all of that as hand-written geometric rules per exercise is brittle and never-ending. This is exactly the kind of open-ended visual judgment a **multimodal LLM** handles well.

In Kinetic, the annotated set — the video with the skeleton overlay baked in — is sent over an encrypted connection to the app's own backend (a Firebase Cloud Function proxy), which forwards it to Google Gemini. The model watches the annotated footage and does two things:

1. **Verifies and counts** at the set level, as a cross-check on the on-device state machine.
2. **Generates specific form feedback** — the coaching that gets spoken back to you via text-to-speech mid-set, so you don't have to break form to read your screen.

Two design choices make this work:

- **Send the annotated video, not raw frames.** The skeleton overlay is a strong visual prior. You're handing the model the joint positions you already computed, so it reasons about *technique* instead of re-solving pose detection from scratch.
- **Proxy through your own backend.** The app never ships an API key to the device and never talks to the model provider directly from the phone. The Cloud Function is the choke point for auth, rate limits, and keeping the raw stream off third-party ad networks.

The division of labor is the whole point: the cheap deterministic layer runs constantly and counts; the expensive reasoning layer runs selectively and coaches.

## The honest limitations

Anyone selling you a flawless AI form checker is overselling. The real constraints:

- **Garbage in, garbage out.** If pose detection loses your keypoints — bad lighting, a phone propped at a weird angle, a limb out of frame — both the count and the coaching degrade. The skeleton overlay exists so you can catch this yourself.
- **A single camera can't see everything.** Depth and rotation are hard from one 2D viewpoint. A form fault that's only visible from the side may be invisible head-on.
- **LLM feedback is guidance, not a physio diagnosis.** A multimodal model gives useful, general form cues. It doesn't know your injury history or biomechanics, and it can occasionally be confidently wrong. Treat it as a smart spotter, not a clinician.
- **Latency budgets are real.** On-device counting is instant; LLM coaching is not free. You architect around when it's worth spending a model call, not calling it every rep.

None of this makes the approach less useful. It makes it *honest*. A live skeleton you can trust, a deterministic counter you can debug, and a reasoning model that catches what rules can't — that's a genuinely good spotter, and it's what the pipeline is actually doing under the hood.

## Try it

Want to see the pipeline running on your own reps — live pose detection, an automatic rep counter, and spoken AI form correction, all from your phone's camera? That's exactly what [Download Kinetic AI Coach](https://github.com/dzianisv/KineticAiCoach/releases/latest/download/kinetic-ai-coach.apk) does. It's one of the apps we build at AgentLabs.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "How does AI count reps?", "acceptedAnswer": {"@type": "Answer", "text": "A pose detection model extracts body keypoints from each camera frame, then a joint-angle state machine tracks the relevant joint (knee for squats, elbow for curls) between an UP and a DOWN threshold. One full UP to DOWN to UP transition is counted as a rep. The counting itself is deterministic geometry, not a language model."}},
    {"@type": "Question", "name": "What does the multimodal LLM do in an AI rep counter?", "acceptedAnswer": {"@type": "Answer", "text": "The multimodal LLM handles form correction and set-level verification. It watches the annotated video with the skeleton overlay and generates specific technique feedback, which is harder to express as fixed geometric rules than the count itself."}},
    {"@type": "Question", "name": "Does AI form correction run on the device or in the cloud?", "acceptedAnswer": {"@type": "Answer", "text": "Pose detection and rep counting run on-device for low latency and privacy. The form-correction step sends the annotated set over an encrypted connection to a backend proxy that forwards it to a multimodal model, so the raw continuous video never leaves the phone."}},
    {"@type": "Question", "name": "How accurate is AI rep counting?", "acceptedAnswer": {"@type": "Answer", "text": "Accuracy depends on pose quality. Good lighting, a stable camera angle, and your full body in frame produce a clean skeleton and reliable counts. Poor conditions drop keypoint confidence and degrade both counting and form feedback, which is why a visible skeleton overlay matters."}}
  ]
}
</script>
