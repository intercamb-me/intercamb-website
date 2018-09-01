export class Constants {

  public static readonly PHONE_PATTERN = '^\\+\\d{1,3} \\d+ \\d{4,}$';
  public static readonly PHONE_MASK = '+0* 0* 0*';
  public static readonly CPF_MASK = '000.000.000-00';
  public static readonly ZIP_CODE_MASK = '00000-000';
  public static readonly CURRENCY_MASK = '0*.00';
  public static readonly NUMBER_MASK = '0*';

  public static readonly TASK_STATUS = {
    pending: {
      id: 'pending',
      name: 'Pendente',
      colorSelector: 'secondary',
      primaryColor: '#8f979e',
      secondaryColor: '#6c757d',
    },
    finished: {
      id: 'finished',
      name: 'Finalizado',
      colorSelector: 'success',
      primaryColor: '#41d262',
      secondaryColor: '#28a745',
    },
    canceled: {
      id: 'canceled',
      name: 'Cancelado',
      colorSelector: 'danger',
      primaryColor: '#e66f7a',
      secondaryColor: '#dc3545',
    },
  };

  public static readonly TASK_FIELD_TYPES = {
    text: {
      id: 'text',
      name: 'Texto',
    },
    textarea: {
      id: 'textarea',
      name: 'Texto longo',
    },
    number: {
      id: 'number',
      name: 'Número',
    },
    date: {
      id: 'date',
      name: 'Data',
    },
    place: {
      id: 'place',
      name: 'Localização',
    },
  };

  public static readonly PAYMENT_METHODS = {
    credit_card: {
      id: 'credit_card',
      name: 'Cartão de crédito',
      icon: ['fas', 'credit-card'],
    },
    boleto: {
      id: 'boleto',
      name: 'Boleto',
      icon: ['fas', 'barcode'],
    },
    bank_deposit: {
      id: 'bank_deposit',
      name: 'Depósito bancário',
      icon: ['fas', 'envelope-open'],
    },
    others: {
      id: 'others',
      name: 'Outros',
      icon: ['fas', 'dollar-sign'],
    },
  };
}
