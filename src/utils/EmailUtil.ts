export const getEmailSuffix = (email: string): string => {
  return email.split('@')[1]
}
