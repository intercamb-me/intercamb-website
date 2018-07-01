export class Constants {

  public static readonly TASK_TYPES = {
    contract: {
      id: 'contract',
      name: 'Contrato',
    },
    identity: {
      id: 'identity',
      name: 'Identidade',
    },
    passport: {
      id: 'passport',
      name: 'Passaporte',
    },
    birth_certificate: {
      id: 'birth_certificate',
      name: 'Certidão de nascimento',
    },
    high_school_certificate: {
      id: 'high_school_certificate',
      name: 'Certificado de ensino médio',
    },
    high_school_historic: {
      id: 'high_school_historic',
      name: 'Histórico do ensino médio',
    },
    course_enrolment: {
      id: 'course_enrolment',
      name: 'Inscrição no curso',
    },
    native_criminal_records: {
      id: 'native_criminal_records',
      name: 'Antecedentes criminais (Brasil)',
    },
    foreign_criminal_records: {
      id: 'foreign_criminal_records',
      name: 'Antecedentes criminais (Argentina)',
    },
    foreign_identity: {
      id: 'foreign_identity',
      name: 'DNI (Argentina)',
    },
    reception: {
      id: 'reception',
      name: 'Recepção',
    },
    other_documents: {
      id: 'other_documents',
      name: 'Outros documentos',
    },
  };

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
