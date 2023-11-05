var DataTypes = require("sequelize").DataTypes;
var _administrador = require("./administrador");
var _cliente = require("./cliente");
var _color = require("./color");
var _devolucion = require("./devolucion");
var _inventario_local = require("./inventario_local");
var _local = require("./local");
var _orden_envio = require("./orden_envio");
var _orden_solicitud = require("./orden_solicitud");
var _orden_venta_fisica = require("./orden_venta_fisica");
var _producto = require("./producto");
var _producto_casa_matriz = require("./producto_casa_matriz");
var _producto_ordenado = require("./producto_ordenado");
var _producto_solicitado = require("./producto_solicitado");
var _producto_venta = require("./producto_venta");
var _taller = require("./taller");
var _usuario = require("./usuario");
var _vendedor = require("./vendedor");

function initModels(sequelize) {
  var administrador = _administrador(sequelize, DataTypes);
  var cliente = _cliente(sequelize, DataTypes);
  var color = _color(sequelize, DataTypes);
  var devolucion = _devolucion(sequelize, DataTypes);
  var inventario_local = _inventario_local(sequelize, DataTypes);
  var local = _local(sequelize, DataTypes);
  var orden_envio = _orden_envio(sequelize, DataTypes);
  var orden_solicitud = _orden_solicitud(sequelize, DataTypes);
  var orden_venta_fisica = _orden_venta_fisica(sequelize, DataTypes);
  var producto = _producto(sequelize, DataTypes);
  var producto_casa_matriz = _producto_casa_matriz(sequelize, DataTypes);
  var producto_ordenado = _producto_ordenado(sequelize, DataTypes);
  var producto_solicitado = _producto_solicitado(sequelize, DataTypes);
  var producto_venta = _producto_venta(sequelize, DataTypes);
  var taller = _taller(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);
  var vendedor = _vendedor(sequelize, DataTypes);

  color.belongsToMany(producto, { as: 'producto_referencia_productos', through: producto_casa_matriz, foreignKey: "color_IDcolor", otherKey: "producto_referencia" });
  producto.belongsToMany(color, { as: 'color_IDcolor_colors', through: producto_casa_matriz, foreignKey: "producto_referencia", otherKey: "color_IDcolor" });
  orden_venta_fisica.belongsTo(cliente, { as: "cliente_cedula_cliente", foreignKey: "cliente_cedula"});
  cliente.hasMany(orden_venta_fisica, { as: "orden_venta_fisicas", foreignKey: "cliente_cedula"});
  producto_casa_matriz.belongsTo(color, { as: "color_IDcolor_color", foreignKey: "color_IDcolor"});
  color.hasMany(producto_casa_matriz, { as: "producto_casa_matrizs", foreignKey: "color_IDcolor"});
  producto_ordenado.belongsTo(devolucion, { as: "devolucion_IDdevolucion_devolucion", foreignKey: "devolucion_IDdevolucion"});
  devolucion.hasMany(producto_ordenado, { as: "producto_ordenados", foreignKey: "devolucion_IDdevolucion"});
  inventario_local.belongsTo(local, { as: "local_IDlocal_local", foreignKey: "local_IDlocal"});
  local.hasMany(inventario_local, { as: "inventario_locals", foreignKey: "local_IDlocal"});
  orden_envio.belongsTo(local, { as: "local_idlocal_local", foreignKey: "local_idlocal"});
  local.hasMany(orden_envio, { as: "orden_envios", foreignKey: "local_idlocal"});
  devolucion.belongsTo(orden_envio, { as: "orden_envio_IDorden_orden_envio", foreignKey: "orden_envio_IDorden"});
  orden_envio.hasMany(devolucion, { as: "devolucions", foreignKey: "orden_envio_IDorden"});
  producto_ordenado.belongsTo(orden_envio, { as: "orden_envio_IDorden_orden_envio", foreignKey: "orden_envio_IDorden"});
  orden_envio.hasMany(producto_ordenado, { as: "producto_ordenados", foreignKey: "orden_envio_IDorden"});
  producto_solicitado.belongsTo(orden_solicitud, { as: "orden_solicitud", foreignKey: "orden_solicitud_id"});
  orden_solicitud.hasMany(producto_solicitado, { as: "producto_solicitados", foreignKey: "orden_solicitud_id"});
  producto_venta.belongsTo(orden_venta_fisica, { as: "orden_venta_fisica_IDventa_orden_venta_fisica", foreignKey: "orden_venta_fisica_IDventa"});
  orden_venta_fisica.hasMany(producto_venta, { as: "producto_venta", foreignKey: "orden_venta_fisica_IDventa"});
  producto_casa_matriz.belongsTo(producto, { as: "producto_referencia_producto", foreignKey: "producto_referencia"});
  producto.hasMany(producto_casa_matriz, { as: "producto_casa_matrizs", foreignKey: "producto_referencia"});
  inventario_local.belongsTo(producto_casa_matriz, { as: "producto_casa_matriz_producto_referencia_producto_casa_matriz", foreignKey: "producto_casa_matriz_producto_referencia"});
  producto_casa_matriz.hasMany(inventario_local, { as: "inventario_locals", foreignKey: "producto_casa_matriz_producto_referencia"});
  inventario_local.belongsTo(producto_casa_matriz, { as: "producto_casa_matriz_color_IDcolor_producto_casa_matriz", foreignKey: "producto_casa_matriz_color_IDcolor"});
  producto_casa_matriz.hasMany(inventario_local, { as: "producto_casa_matriz_color_IDcolor_inventario_locals", foreignKey: "producto_casa_matriz_color_IDcolor"});
  producto_ordenado.belongsTo(producto_casa_matriz, { as: "producto_casa_matriz_producto_referencia_producto_casa_matriz", foreignKey: "producto_casa_matriz_producto_referencia"});
  producto_casa_matriz.hasMany(producto_ordenado, { as: "producto_ordenados", foreignKey: "producto_casa_matriz_producto_referencia"});
  producto_ordenado.belongsTo(producto_casa_matriz, { as: "producto_casa_matriz_color_IDcolor_producto_casa_matriz", foreignKey: "producto_casa_matriz_color_IDcolor"});
  producto_casa_matriz.hasMany(producto_ordenado, { as: "producto_casa_matriz_color_IDcolor_producto_ordenados", foreignKey: "producto_casa_matriz_color_IDcolor"});
  producto_solicitado.belongsTo(producto_casa_matriz, { as: "producto_casa_matriz_color", foreignKey: "producto_casa_matriz_color_id"});
  producto_casa_matriz.hasMany(producto_solicitado, { as: "producto_solicitados", foreignKey: "producto_casa_matriz_color_id"});
  producto_solicitado.belongsTo(producto_casa_matriz, { as: "producto_casa_matriz_producto_referencia_producto_casa_matriz", foreignKey: "producto_casa_matriz_producto_referencia"});
  producto_casa_matriz.hasMany(producto_solicitado, { as: "producto_casa_matriz_producto_referencia_producto_solicitados", foreignKey: "producto_casa_matriz_producto_referencia"});
  producto_venta.belongsTo(producto_casa_matriz, { as: "producto_casa_matriz_producto_referencia_producto_casa_matriz", foreignKey: "producto_casa_matriz_producto_referencia"});
  producto_casa_matriz.hasMany(producto_venta, { as: "producto_venta", foreignKey: "producto_casa_matriz_producto_referencia"});
  producto_venta.belongsTo(producto_casa_matriz, { as: "producto_casa_matriz_producto_IDcolor_producto_casa_matriz", foreignKey: "producto_casa_matriz_producto_IDcolor"});
  producto_casa_matriz.hasMany(producto_venta, { as: "producto_casa_matriz_producto_IDcolor_producto_venta", foreignKey: "producto_casa_matriz_producto_IDcolor"});
  orden_solicitud.belongsTo(taller, { as: "taller", foreignKey: "taller_ID"});
  taller.hasMany(orden_solicitud, { as: "orden_solicituds", foreignKey: "taller_ID"});
  administrador.belongsTo(usuario, { as: "cedula_usuario", foreignKey: "cedula"});
  usuario.hasOne(administrador, { as: "administrador", foreignKey: "cedula"});
  cliente.belongsTo(usuario, { as: "cedula_usuario", foreignKey: "cedula"});
  usuario.hasOne(cliente, { as: "cliente", foreignKey: "cedula"});
  vendedor.belongsTo(usuario, { as: "cedula_usuario", foreignKey: "cedula"});
  usuario.hasOne(vendedor, { as: "vendedor", foreignKey: "cedula"});
  orden_venta_fisica.belongsTo(vendedor, { as: "vendedor_cedula_vendedor", foreignKey: "vendedor_cedula"});
  vendedor.hasMany(orden_venta_fisica, { as: "orden_venta_fisicas", foreignKey: "vendedor_cedula"});

  return {
    administrador,
    cliente,
    color,
    devolucion,
    inventario_local,
    local,
    orden_envio,
    orden_solicitud,
    orden_venta_fisica,
    producto,
    producto_casa_matriz,
    producto_ordenado,
    producto_solicitado,
    producto_venta,
    taller,
    usuario,
    vendedor,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
