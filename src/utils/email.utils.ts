// generate account verification otp email html

// generate account verification otp email html

const otpVerificationHtml = (
  user: { first_name: string; last_name: string; email: string },
  otp: string,
) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Account</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f8ff; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <tr>
              <td style="background:#1e3a8a; padding:24px; text-align:center;">
                <h1 style="margin:0; color:#ffffff; font-size:24px;">Account Verification</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px; color:#1f2937;">
                <p style="margin:0 0 16px; font-size:16px;">
                  Hi <strong>${user.first_name} ${user.last_name}</strong>,
                </p>

                <p style="margin:0 0 16px; font-size:15px; line-height:1.6;">
                  Thank you for creating an account with us. Please use the OTP below to verify your email address
                  (<strong>${user.email}</strong>).
                </p>

                <!-- OTP Box -->
                <div style="margin:24px 0; text-align:center;">
                  <span style="
                    display:inline-block;
                    background:#2563eb;
                    color:#ffffff;
                    padding:14px 28px;
                    font-size:24px;
                    letter-spacing:4px;
                    border-radius:6px;
                    font-weight:bold;
                  ">
                    ${otp}
                  </span>
                </div>

                <p style="margin:0 0 16px; font-size:14px; line-height:1.6; color:#374151;">
                  This OTP is valid for 10 minutes. If you did not request this, please ignore this email.
                </p>

                <p style="margin:0; font-size:14px; color:#374151;">
                  Regards,<br />
                  <strong>Your Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#eff6ff; padding:16px; text-align:center; font-size:12px; color:#64748b;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  return html;
};

export default otpVerificationHtml;
