interface TypesProduct {
  idProduct: string;
  idUsuario: string;
  nameProduct: string;
  descripcion: string;
  precio: number;
  stock: number;
  instrucciones: string;
  status: boolean;
  imgProduct: string;
}

type typeProductNotId = Omit<TypesProduct>;

interface TypesUser {
  id: number;
  idCliente: string;
  typeUser: string;
  correo: string;
  nameUser: string;
  password: string;
  avatar: string;
}

type typeUserNotPassword = Omit<TypesUser, "password", "id">;

export { TypesProduct, typeProductNotId, TypesUser, typeUserNotPassword };
