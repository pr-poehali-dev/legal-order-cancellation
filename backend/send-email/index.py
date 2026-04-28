"""
Отправка заявления на отмену судебного приказа на email посетителя.
"""
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        raw = event.get("body", "{}")
        body = json.loads(raw) if isinstance(raw, str) else raw
        if isinstance(body, str):
            body = json.loads(body)
    except Exception:
        return {"statusCode": 400, "headers": cors_headers, "body": json.dumps({"error": "Неверный формат данных"})}

    required = ["fullName", "position", "orderNumber", "orderDate", "employer", "reason", "demand", "email"]
    for field in required:
        if not body.get(field):
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": f"Поле '{field}' обязательно"}),
            }

    full_name = body["fullName"]
    position = body["position"]
    order_number = body["orderNumber"]
    order_date = body["orderDate"]
    employer = body["employer"]
    reason = body["reason"]
    demand = body["demand"]
    recipient_email = body["email"]

    smtp_login = os.environ["MAIL_RU_EMAIL"]
    smtp_password = os.environ["MAIL_RU_PASSWORD"]

    html_body = f"""
    <html>
    <body style="font-family: Georgia, serif; color: #1A1612; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="border-top: 3px solid #B8962E; padding-top: 20px; margin-bottom: 24px;">
        <h1 style="font-size: 22px; margin: 0;">Заявление на отмену судебного приказа</h1>
        <p style="color: #888; font-size: 13px; margin: 4px 0 0;">Получено через онлайн-форму</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #888; width: 200px;">ФИО заявителя</td>
          <td style="padding: 10px 0; font-weight: bold;">{full_name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #888;">Должность</td>
          <td style="padding: 10px 0;">{position}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #888;">Работодатель</td>
          <td style="padding: 10px 0;">{employer}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #888;">Номер приказа</td>
          <td style="padding: 10px 0;">{order_number}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #888;">Дата приказа</td>
          <td style="padding: 10px 0;">{order_date}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; color: #888;">Email заявителя</td>
          <td style="padding: 10px 0;">{recipient_email}</td>
        </tr>
      </table>

      <div style="margin-top: 20px;">
        <p style="color: #888; font-size: 13px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em;">Основания для отмены</p>
        <p style="background: #F5F2EC; padding: 14px; font-size: 14px; line-height: 1.6; margin: 0;">{reason}</p>
      </div>

      <div style="margin-top: 16px;">
        <p style="color: #888; font-size: 13px; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em;">Требование заявителя</p>
        <p style="background: #F5F2EC; padding: 14px; font-size: 14px; line-height: 1.6; margin: 0;">{demand}</p>
      </div>

      <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 16px; color: #aaa; font-size: 12px;">
        LexForma — юридическая помощь в трудовых спорах
      </div>
    </body>
    </html>
    """

    def send(to_addr: str, subject: str):
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = smtp_login
        msg["To"] = to_addr
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
            server.login(smtp_login, smtp_password)
            server.sendmail(smtp_login, to_addr, msg.as_string())

    send(smtp_login, f"Новое заявление от {full_name}")

    send(
        recipient_email,
        "Ваше заявление на отмену судебного приказа принято",
    )

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"success": True}),
    }