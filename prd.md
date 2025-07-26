Here’s a **Product Requirement Document (PRD)** for the described product — a JS-based website using ShadCN UI and OpenRouter for solving on-screen problems via webcam capture.

---

# 📝 Product Requirement Document

**Product Name:** OneClick Problem Solver
**Owner:** \[Your Name]
**Last Updated:** July 26, 2025
**Status:** Draft

---

## 🎯 Purpose

To build a single-button web application that uses the front-facing camera to capture the user's screen (via camera reflection), identify the problem statement displayed, send it to an AI model via OpenRouter, and display only the final answer. The goal is to create a frictionless experience for users to get answers to printed or screen-displayed problems (e.g. math, puzzles, quizzes) using just their webcam and a single click.

---

## 🔥 Key Features

1. **One-Click Solve**

   * User presses a single button: “Solve Problem”
   * Triggers:

     * Webcam capture
     * Image sent to backend AI model
     * Result (answer only) is shown on screen

2. **Front-Camera Image Capture**

   * Use `navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }})` to capture image from front camera.

3. **AI Integration via OpenRouter**

   * Image is sent to OpenRouter API with appropriate model (e.g. GPT-4 Vision or Claude).
   * Prompt: Extract problem → solve it → return **only** the answer text.

4. **UI/UX via ShadCN UI**

   * Polished, minimalist two-pane layout:

     * **Left pane**: Final answer
     * **Right pane** (optional): User preview or capture feedback (blurred/masked)

---

## 🧪 User Flow

1. User visits site.
2. User sees “Solve” button.
3. User aligns problem text (on screen/paper) in front of camera.
4. User clicks “Solve”:

   * System takes snapshot
   * Sends image to OpenRouter API
   * Extracts solution
5. Final answer appears in **left pane**.

---

## 📦 Functional Requirements

| ID  | Description                                                     |
| --- | --------------------------------------------------------------- |
| FR1 | App must use front-facing camera to capture snapshot.           |
| FR2 | App must send captured image to OpenRouter-compatible endpoint. |
| FR3 | App must extract and display only the answer from model output. |
| FR4 | All interaction should be possible with one click.              |
| FR5 | UI must be responsive and built with ShadCN components.         |

---

## 🖼️ UI Design

**Layout:**

```
|---------------------|-------------------|
|      Left Pane      |    Right Pane     |
|   Final Answer      |  (optional) cam   |
|   Text View         |   feedback/image  |
|---------------------|-------------------|
```

**Components:**

* `Button`: `Solve Problem`
* `Card`: for displaying answer
* `Spinner`: while waiting for response
* `Alert`: error if model fails

---

## 🔐 Non-Functional Requirements

| Category      | Requirement                                 |
| ------------- | ------------------------------------------- |
| Performance   | Response time < 5s on average               |
| Security      | No persistent image storage                 |
| Privacy       | Request camera permission on demand only    |
| Compatibility | Chrome, Safari, Firefox on Desktop & Mobile |
| Accessibility | Button should be keyboard-navigable         |

---

## 🤖 AI Prompt Example

```txt
You will receive an image containing a problem statement (e.g. a math or logical question). Your task is to:
1. Read the problem from the image.
2. Solve it.
3. Respond with only the **final answer** — no explanation, no context.

Example format:  
"Answer: 42"
```

---

## 📡 API (OpenRouter)

* **Endpoint:** `https://openrouter.ai/api/v1/chat/completions`
* **Model:** gpt-4-vision-preview or claude-3-opus
* **Image Encoding:** Base64 or multipart form with image
* **Headers:**

  * `Authorization: Bearer <OPENROUTER_API_KEY>`
  * `Content-Type: application/json`

---

## 📅 Milestones

| Milestone                    | Target Date |
| ---------------------------- | ----------- |
| UI Prototype with ShadCN     | Aug 2       |
| Camera Capture Working       | Aug 5       |
| OpenRouter Image Prompt Flow | Aug 7       |
| Full App with Error Handling | Aug 10      |
| Internal Testing             | Aug 12      |

---

## 🛠️ Tech Stack

* **Frontend:** Vite + React + ShadCN UI + Tailwind
* **Image Processing:** HTML5 canvas
* **AI API:** OpenRouter (gpt-4-vision / Claude)
* **Deployment:** Vercel / Netlify

---

## 🧩 Future Enhancements

* Multi-shot capture for better OCR
* Allow uploading screenshots instead of webcam
* Show both answer and step-by-step on toggle
* Voice command support: "Solve this"

---

Want a code starter kit or UI sketch next?
