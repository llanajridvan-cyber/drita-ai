* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: radial-gradient(circle at top, #14315f 0%, #09111f 45%, #050a14 100%);
  color: white;
  min-height: 100vh;
}

.app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
}

.card {
  width: 100%;
  max-width: 860px;
  background: rgba(10, 20, 40, 0.82);
  border: 1px solid rgba(90, 170, 255, 0.18);
  border-radius: 26px;
  padding: 28px;
  box-shadow: 0 0 30px rgba(0, 170, 255, 0.12), 0 0 80px rgba(0, 80, 180, 0.12);
}

h1 {
  margin: 0;
  text-align: center;
  font-size: 46px;
}

.subtitle {
  text-align: center;
  color: #b9d9ff;
  margin: 10px 0 22px;
}

.teacher-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 18px;
}

.avatar {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 0 25px rgba(0, 255, 255, 0.35), 0 0 55px rgba(0, 170, 255, 0.18);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.avatar.talking {
  transform: scale(1.05);
  box-shadow: 0 0 35px rgba(0, 255, 255, 0.65), 0 0 70px rgba(0, 170, 255, 0.35);
}

.teacher-status {
  margin-top: 12px;
  color: #7fd8ff;
  font-size: 15px;
}

.level-bar,
.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 14px;
}

.lesson-info {
  text-align: center;
  color: #ffd166;
  margin-top: 10px;
  font-weight: bold;
}

.chat-box {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  min-height: 290px;
  max-height: 390px;
  overflow-y: auto;
  padding: 16px;
  margin-top: 16px;
}

.message {
  margin-bottom: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  line-height: 1.5;
}

.message .name {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
}

.message.user {
  background: rgba(0, 170, 255, 0.14);
  border: 1px solid rgba(0, 170, 255, 0.14);
}

.message.ai {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.message p {
  margin: 0;
}

.input-row {
  display: flex;
  gap: 10px;
  margin-top: 18px;
}

input {
  flex: 1;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid rgba(0, 170, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: white;
  font-size: 15px;
  outline: none;
}

input::placeholder {
  color: #aac6e8;
}

button {
  border: none;
  border-radius: 14px;
  padding: 13px 16px;
  background: linear-gradient(180deg, #1ea8ff, #0f7fe0);
  color: white;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
}

button:hover {
  opacity: 0.95;
}

@media (max-width: 640px) {
  .card {
    padding: 20px;
  }

  h1 {
    font-size: 36px;
  }

  .avatar {
    width: 180px;
    height: 180px;
  }

  .input-row {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
