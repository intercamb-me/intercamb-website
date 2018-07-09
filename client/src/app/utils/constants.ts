export class Constants {

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

  private constructor() {

  }
}
