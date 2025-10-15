export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export function welcomeEmail(name: string, email: string): EmailTemplate {
  const subject = "Welcome to CryptoTax!";
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0f172a 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e2e8f0; border-top: none; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; color: #64748b; font-size: 14px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
          .button:hover { background: #059669; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Welcome to CryptoTax!</h1>
          <p>Your crypto tax calculation journey starts here</p>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Thank you for joining CryptoTax. We're excited to help you manage your cryptocurrency taxes with ease.</p>
          
          <p>Here's what you can do next:</p>
          <ul>
            <li>📊 Import your transaction history from exchanges</li>
            <li>🔗 Connect your wallet addresses</li>
            <li>📈 Generate tax reports compliant with German tax law</li>
            <li>💾 Export your data for your tax advisor</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Get Started</a>
          </div>
          
          <p>If you have any questions, feel free to reach out to our support team.</p>
          
          <p>Best regards,<br>The CryptoTax Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CryptoTax. All rights reserved.</p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      </body>
    </html>
  `;
  
  const text = `
Welcome to CryptoTax!

Hello ${name}!

Thank you for joining CryptoTax. We're excited to help you manage your cryptocurrency taxes with ease.

Here's what you can do next:
- Import your transaction history from exchanges
- Connect your wallet addresses  
- Generate tax reports compliant with German tax law
- Export your data for your tax advisor

Get started: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard

If you have any questions, feel free to reach out to our support team.

Best regards,
The CryptoTax Team

© ${new Date().getFullYear()} CryptoTax. All rights reserved.
If you didn't create an account, please ignore this email.
  `;

  return { subject, html, text };
}

export function passwordResetEmail(resetLink: string): EmailTemplate {
  const subject = "Reset Your CryptoTax Password";
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0f172a 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e2e8f0; border-top: none; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; color: #64748b; font-size: 14px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
          .button:hover { background: #059669; }
          .warning { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Password Reset Request</h1>
          <p>Secure your CryptoTax account</p>
        </div>
        <div class="content">
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password for your CryptoTax account.</p>
          
          <div style="text-align: center;">
            <a href="${resetLink}" class="button">Reset Password</a>
          </div>
          
          <div class="warning">
            <strong>⚠️ Important:</strong>
            <ul>
              <li>This link will expire in 1 hour</li>
              <li>If you didn't request this reset, please ignore this email</li>
              <li>Never share this link with anyone</li>
            </ul>
          </div>
          
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background: #f1f5f9; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px;">${resetLink}</p>
          
          <p>Best regards,<br>The CryptoTax Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CryptoTax. All rights reserved.</p>
          <p>This email was sent to ${process.env.NEXT_PUBLIC_APP_URL}</p>
        </div>
      </body>
    </html>
  `;
  
  const text = `
Password Reset Request

Reset Your Password

We received a request to reset your password for your CryptoTax account.

Reset your password: ${resetLink}

⚠️ Important:
- This link will expire in 1 hour
- If you didn't request this reset, please ignore this email  
- Never share this link with anyone

If the link doesn't work, copy and paste this URL into your browser:
${resetLink}

Best regards,
The CryptoTax Team

© ${new Date().getFullYear()} CryptoTax. All rights reserved.
  `;

  return { subject, html, text };
}

export function reportReadyEmail(reportYear: number): EmailTemplate {
  const subject = `Your ${reportYear} Tax Report is Ready`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0f172a 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e2e8f0; border-top: none; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; color: #64748b; font-size: 14px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
          .button:hover { background: #059669; }
          .highlight { background: #ecfdf5; border: 1px solid #10b981; padding: 15px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 Tax Report Ready!</h1>
          <p>Your ${reportYear} crypto tax report has been generated</p>
        </div>
        <div class="content">
          <h2>Great news!</h2>
          <p>Your ${reportYear} cryptocurrency tax report has been successfully generated and is ready for download.</p>
          
          <div class="highlight">
            <strong>📈 Report Summary:</strong>
            <ul>
              <li>Tax Year: ${reportYear}</li>
              <li>Calculation Method: FIFO (First In, First Out)</li>
              <li>German Tax Compliant: ✓</li>
              <li>Ready for Finanzamt: ✓</li>
            </ul>
          </div>
          
          <div style="text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/reports" class="button">Download Report</a>
          </div>
          
          <p><strong>What's next?</strong></p>
          <ul>
            <li>📥 Download your PDF report</li>
            <li>📋 Review the calculations</li>
            <li>👨‍💼 Share with your tax advisor</li>
            <li>📤 Submit to the Finanzamt</li>
          </ul>
          
          <p>If you have any questions about your report, don't hesitate to contact our support team.</p>
          
          <p>Best regards,<br>The CryptoTax Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CryptoTax. All rights reserved.</p>
          <p>This report was generated for ${process.env.NEXT_PUBLIC_APP_URL}</p>
        </div>
      </body>
    </html>
  `;
  
  const text = `
Tax Report Ready!

Great news!

Your ${reportYear} cryptocurrency tax report has been successfully generated and is ready for download.

📈 Report Summary:
- Tax Year: ${reportYear}
- Calculation Method: FIFO (First In, First Out)
- German Tax Compliant: ✓
- Ready for Finanzamt: ✓

Download your report: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard/reports

What's next?
- Download your PDF report
- Review the calculations
- Share with your tax advisor
- Submit to the Finanzamt

If you have any questions about your report, don't hesitate to contact our support team.

Best regards,
The CryptoTax Team

© ${new Date().getFullYear()} CryptoTax. All rights reserved.
  `;

  return { subject, html, text };
}
