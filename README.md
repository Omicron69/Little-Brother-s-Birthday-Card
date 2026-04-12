# Muhit's 20th Birthday Card

A pixel-art F1-themed birthday card built as a small birthday gift to my dear brother. 

---

## 📁 Project Structure

```
muhit-birthday/
│
├── index.html                        ← Entry point (the card)
├── duck-hunt-custom.html             ← The game (linked from card)
│
├── models/
│   └── AppModel.js                   ← All data & app state
│
├── views/
│   └── components/
│       └── CardView.js               ← DOM builders (pure, no logic)
│
├── controllers/
│   └── AppController.js              ← Wires model → view, handles events
│
└── assets/
    └── css/
        └── main.css                  ← All styles
```

---



## MVC Architecture

| Layer | File | Responsibility |
|---|---|---|
| **Model** | `models/AppModel.js` | All data: birthday info, letter text, YouTube ID, pixel car data, confetti config, app state |
| **View** | `views/components/CardView.js` | Pure DOM builders. Receives data, returns elements. Zero logic. |
| **Controller** | `controllers/AppController.js` | Reads model, calls view builders, attaches events, runs animations |



