export interface MailMessage {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface MailResult {
  /** Link de pré-visualização (quando o provider suportar, ex.: Ethereal). */
  previewUrl?: string;
}

export interface IMailProvider {
  sendMail(message: MailMessage): Promise<MailResult>;
}
