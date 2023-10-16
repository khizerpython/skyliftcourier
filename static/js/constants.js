const NAME_REGEX = /^([a-zA-Z]+)((\s)([a-zA-Z]+))*$/;

const USERNAME_REGEX = /^(?=[A-Za-z]{1})([a-zA-Z0-9@#_.-]){3,25}$/;
const PASSWORD_REGEX = /^.*(?=.{6,50})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W]).*$/;

const CONTACT_NUMBER_REGEX = /((\+923|03)[\d]{9}$|(09)[\d]{8}$|(92)[\d]{10}$|(^\d{11})$)/;
const EMAIL_ADDRESS_REGEX = /^\w+([\.-]?|[\w])*@\w+([\.-]?[\w+])*(\.\w{2,3})+$/;


