export class Constants {

  public static readonly TASK_STATUS = {
    pending: {
      id: 'pending',
      name: 'Pendente',
      selector: 'secondary',
      manual: true,
    },
    validation_pending: {
      id: 'validation_pending',
      name: 'Validar',
      selector: 'warning',
      manual: false,
    },
    scheduled: {
      id: 'scheduled',
      name: 'Agendado',
      selector: 'info',
      manual: true,
    },
    finished: {
      id: 'finished',
      name: 'Finalizado',
      selector: 'success',
      manual: true,
    },
    canceled: {
      id: 'canceled',
      name: 'Cancelado',
      selector: 'danger',
      manual: true,
    },
  };

  private constructor() {

  }
}
