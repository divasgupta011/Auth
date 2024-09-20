import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailtemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });

        console.log("Verification email sent successfully", response);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];  // Corrected spelling
    
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "d56180d6-9167-49e9-a6c0-4d125f71fd27",
            template_variables: {
                "company_info_name": "Test_Company_info_name",
                "name": name,
            }
        });
        console.log("Welcome email sent successfully", response);
        
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email,resetURL) => {
    const recepient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to: recepient,
            subject: "Reset your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category: "Password reset",
        })

        
    } catch (error) {

        console.log("Error sending password reset email",error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
}


export const sendResetSuccessEmail= async (email) => {
    const recepient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recepient,
            subject:"Password reset successfully",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password reset"
        });

        console.log("Password reset email sent successfuly");

    } catch (error) {
        console.log("Error sending password reset success email:",error);
        throw new Error(`Error sending password reset success email: ${error}`)
    }
}