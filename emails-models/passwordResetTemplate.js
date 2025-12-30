export const passwordResetTemplate = (resetUrl) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer Contraseña - AppsFly</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            margin-top: 40px;
            margin-bottom: 40px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            height: 40px;
            margin-bottom: 10px;
        }
        .title {
            color: #021f41;
            font-size: 24px;
            font-weight: 700;
            margin: 0;
        }
        .content {
            color: #4b5563;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            background-color: #01c676;
            color: #ffffff;
            padding: 12px 30px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #01a864;
        }
        .footer {
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
            margin-top: 30px;
        }
        .link {
            color: #094fd1;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">AppsFly</h1>
        </div>
        <div class="content">
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en AppsFly.</p>
            <p>Si fuiste tú, puedes restablecer tu contraseña haciendo clic en el siguiente botón:</p>
            
            <div class="button-container">
                <a href="${resetUrl}" class="button">Restablecer contraseña</a>
            </div>
            
            <p>Este enlace expirará en 15 minutos por razones de seguridad.</p>
            <p>Si no solicitaste este cambio, puedes ignorar este correo y tu contraseña seguirá siendo la misma.</p>
        </div>
        <div class="footer">
            <p>Este es un mensaje automático, por favor no respondas a este correo.</p>
            <p>&copy; ${new Date().getFullYear()} AppsFly. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`;
