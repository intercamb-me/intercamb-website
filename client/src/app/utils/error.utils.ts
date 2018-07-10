export class ErrorUtils {

  public static readonly CONTEXT_AUTHENTICATION = 'authentication';
  public static readonly CONTEXT_DEFAULT = 'default';

  public static readonly INTERNAL_ERROR = 'internal_error';
  public static readonly AUTHENTICATION_REQUIRED = 'authentication_required';
  public static readonly ACCOUNT_ALREADY_EXISTS = 'account_already_exists';
  public static readonly ACCOUNT_NOT_FOUND = 'account_not_found';
  public static readonly CLIENT_NOT_FOUND = 'client_not_found';
  public static readonly TOKEN_NOT_FOUND = 'token_not_found';
  public static readonly WRONG_PASSWORD = 'wrong_password';
  public static readonly TOKEN_REVOKED = 'token_revoked';
  public static readonly TOKEN_EXPIRED = 'token_expired';

  private static readonly MESSAGES = {};

  public static setup(): void {
    const authContext = {};
    authContext[ErrorUtils.ACCOUNT_ALREADY_EXISTS] = 'Já existe uma conta com este email';
    authContext[ErrorUtils.ACCOUNT_NOT_FOUND] = 'Não existe uma conta com este email';
    authContext[ErrorUtils.WRONG_PASSWORD] = 'Senha inválida';
    ErrorUtils.MESSAGES[ErrorUtils.CONTEXT_AUTHENTICATION] = authContext;

    const defaultContext = {};
    defaultContext[ErrorUtils.TOKEN_REVOKED] = 'Seu acesso foi revogado, por favor conecte-se novamente.';
    defaultContext[ErrorUtils.TOKEN_EXPIRED] = 'Sua sessão expirou, por favor atualize a página.';
    defaultContext[ErrorUtils.AUTHENTICATION_REQUIRED] = 'Por favor acesse sua conta para continuar';
    ErrorUtils.MESSAGES[ErrorUtils.CONTEXT_DEFAULT] = defaultContext;
  }

  public static getErrorMessage(context: string, err: any, message?: string): string {
    if (context) {
      const contextMessages = ErrorUtils.MESSAGES[context];
      if (contextMessages && contextMessages[err.code]) {
        return contextMessages[err.code];
      }
    }
    const defaultMessages = ErrorUtils.MESSAGES[ErrorUtils.CONTEXT_DEFAULT];
    if (defaultMessages && defaultMessages[err.code]) {
      return defaultMessages[err.code];
    }
    return message;
  }

  private constructor() {

  }
}

ErrorUtils.setup();
