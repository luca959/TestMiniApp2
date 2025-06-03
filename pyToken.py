import requests
import random
import string
import time

def generate_fake_bot_token():
    bot_id = str(random.randint(100000000, 999999999))
    hash_part = ''.join(random.choices(string.ascii_letters + string.digits, k=35))
    return f"{bot_id}:AA{hash_part}"

def test_telegram_bot_token(token: str):
    url = f"https://api.telegram.org/bot{token}/getMe"
    try:
        response = requests.get(url, timeout=5)
        data = response.json()

        if response.status_code == 200 and data.get("ok"):
            bot = data["result"]
            print("✅ Token VALIDO trovato!")
            print(f"🤖 Bot: @{bot['username']} - ID: {bot['id']}")
            return True
        else:
            print(f"❌ Token non valido: {token} → {data.get('description', 'Errore')}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"⚠️ Errore di rete per token {token}: {e}")
        return False

if __name__ == "__main__":
    print("♻️ Inizio generazione e test continuo di token Telegram...\nPremi CTRL + C per interrompere.\n")
    try:
        while True:
            token = generate_fake_bot_token()
            test_telegram_bot_token(token)
            time.sleep(0.5)  # Evita di spammare troppo le API (rate limit!)
    except KeyboardInterrupt:
        print("\n🛑 Interrotto manualmente.")
