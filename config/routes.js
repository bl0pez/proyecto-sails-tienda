/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

 'GET /': 'PrincipalController.inicio',

  '/acerca-de': {
    view: 'pages/acerca_de'
  },

  'GET /registro': 'SesionController.registro',

  'POST /procesar-registro': 'SesionController.procesarRegistro',

  'GET /inicio-sesion': 'SesionController.inicioSesion',

  'GET /cerrar-sesion': 'SesionController.cerrarSesion',

  'POST /procesar-inicio-sesion': 'SesionController.procesarInicioSesion',

  'GET /agregar-carro-compra/:fotoId': 'CompraController.agregarCarroCompra',

  'GET /carro-de-compra': 'CompraController.carroCompra',

  'GET /eliminar-carro-compra/:fotoId': 'CompraController.eliminarCarroCompra',

  'GET /comprar': 'CompraController.comprar',

  'GET /mis-ordenes': 'CompraController.misOrdenes',

  'GET /mis-ordenes/:ordenId': 'CompraController.ordenDeCompra',

  'GET /mis-ordenes/:ordenId': 'CompraController.ordenDeCompra',

  'GET /top-vendidas': 'PrincipalController.topVendidas',

  'GET /agregar-lista-deseo/:fotoId': 'CompraController.agregarListaDeseo',

  'GET /lista-deseo': 'CompraController.listaDeseo',

  'GET /eliminar-lista-deseo/:fotoId': 'CompraController.eliminarListaDeseo',

  'GET /admin/inicio-sesion': 'AdminController.inicioSesion',

  'POST /admin/procesar-inicio-sesion': 'AdminController.procesarInicioSesion',

  'GET /admin/principal': 'AdminController.principal',

  'GET /admin/cerrar-sesion': 'AdminController.cerrarSesion',

  'GET /admin/agregar-foto': 'AdminController.agregarFoto',

  'POST /admin/procesar-agregar-foto': 'AdminController.procesarAgregarFoto',

  'GET /admin/desactivar-foto/:fotoId': 'AdminController.desactivarFoto',

  'GET /admin/activar-foto/:fotoId': 'AdminController.activarFoto',

    //admin - admin

    'GET /admin/admins': { controller: 'AdminController', action:'listAdmin', locals:{titulo:'Admin - List'}, view: 'pages/admin/admin_list'},
  
    'GET /admin/desactivar-admin/:adminId': { controller: 'AdminController', action:'desactivarAdmin'},
  
    'GET /admin/activar-admin/:adminId': { controller: 'AdminController', action:'activarAdmin'},
    
  
  
    //admin - cliente
  
    'GET /admin/clientes': { controller: 'AdminController', action:'listAdmin', locals:{titulo:'Admin - Client List'}, view: 'pages/admin/clientes'},
  
    'POST /admin/cliente': { controller: 'AdminController', action:'crearCliente'},
  
    'GET /admin/desactivar-cliente/:clienteId': { controller: 'AdminController', action:'desactivarCliente'},
  
    'GET /admin/activar-cliente/:clienteId': { controller: 'AdminController', action:'activarCliente'},

    //admin - dashboard

    'GET /admin/dashboard/': { controller: 'AdminController', action:'listAdmin', view: 'pages/admin/dashboard'},

/*  'GET /admin/dashboard/': { controller: 'AdminController', action:'mostrarCliente' ,view: 'pages/admin/dashboard'}, */

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
