const path = require('path')
const fs = require('fs');

/**
 * SesionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  inicioSesion: async (peticion, respuesta) => {
    respuesta.view('pages/admin/inicio_sesion')
  },

  procesarInicioSesion: async (peticion, respuesta) => {
    let admin = await Admin.findOne({ email: peticion.body.email, contrasena: peticion.body.contrasena, activa: true })
    if (admin) {
      peticion.session.admin = admin
      peticion.session.cliente = undefined
      peticion.addFlash('mensaje', 'Sesión de admin iniciada')
      return respuesta.redirect("/admin/principal")
    }
    else {
      peticion.addFlash('mensaje', 'Email o contraseña invalidos')
      return respuesta.redirect("/admin/inicio-sesion");
    }
  },

  principal: async (peticion, respuesta) => {
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/admin/inicio-sesion")
    }
    let fotos = await Foto.find().sort("id")
    respuesta.view('pages/admin/principal', { fotos })
  },

  cerrarSesion: async (peticion, respuesta) => {
    peticion.session.admin = undefined
    peticion.addFlash('mensaje', 'Sesión finalizada')
    return respuesta.redirect("/");
  },

  agregarFoto: async (peticion, respuesta) => {
    respuesta.view('pages/admin/agregar_foto')
  },

  procesarAgregarFoto: async (peticion, respuesta) => {
    let foto = await Foto.create({
      titulo: peticion.body.titulo,
      activa: true
    }).fetch()
    peticion.file('foto').upload({}, async (error, archivos) => {
      if (archivos && archivos[0]) {
        let upload_path = archivos[0].fd
        let ext = path.extname(upload_path)

        await fs.createReadStream(upload_path).pipe(fs.createWriteStream(path.resolve(sails.config.appPath, `assets/images/fotos/${foto.id}${ext}`)))
        await Foto.update({ id: foto.id }, { contenido: `${foto.id}${ext}` })
        peticion.addFlash('mensaje', 'Foto agregada')
        return respuesta.redirect("/admin/principal")
      }
      peticion.addFlash('mensaje', 'No hay foto seleccionada')
      return respuesta.redirect("/admin/agregar-foto")
    })
  },

  desactivarFoto: async (peticion, respuesta) => {
    await Foto.update({id: peticion.params.fotoId}, {activa: false})
    peticion.addFlash('mensaje', 'Foto desactivada')
    return respuesta.redirect("/admin/principal")
  },

  activarFoto: async (peticion, respuesta) => {
    await Foto.update({id: peticion.params.fotoId}, {activa: true})
    peticion.addFlash('mensaje', 'Foto activada')
    return respuesta.redirect("/admin/principal")
  },

  //Admin List

  listAdmin: async (peticion,respuesta) =>{
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/admin/inicio-sesion")
    }
    let admins = await Admin.find()
    let clientes = await Cliente.find()
    let ordenes = await Orden.find()
    return respuesta.view({ admins, clientes, ordenes })
  },

  desactivarAdmin: async (peticion, respuesta) => {
    if(!peticion.session.admin || !peticion.session.admin){
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/admin/inicio-sesion")
    }

    if(peticion.session.admin.id != peticion.params.adminId){
      await Admin.update({ id:peticion.params.adminId}, {activa:false})
      peticion.addFlash('mensaje','Administrador inhabilitado')
      return respuesta.redirect("/admin/admins")
    }else{
      peticion.addFlash('error', 'No puedes inhabilitarte')
      return respuesta.redirect("/admin/admins")
    }
  },

  activarAdmin: async (peticion, respuesta) => {
    let id = peticion.params.adminId
    await Admin.update({id: id}, {activa: true})
    peticion.addFlash('mensaje', 'Admin activado')
    return respuesta.redirect("/admin/admins")
  },


  //Clientes Controller

/*   mostrarCliente: async (peticion, respuesta) =>{
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/admin/inicio-sesion")
    }
    let clientes = await Cliente.find()
    return respuesta.view({ clientes })
  }, */

  crearCliente: async( peticion, respuesta) =>{
    if (!peticion.session || !peticion.session.admin) {
      peticion.addFlash('mensaje', 'Sesión inválida')
      return respuesta.redirect("/admin/inicio-sesion")
    }
    let data = {
      nombre: peticion.body.nombre,
      email: peticion.body.email,
      contrasena: peticion.body.contrasena,
    }
    await Cliente.create(data).fetch()
    peticion.addFlash('mensaje', 'Usuario creado')
    return respuesta.redirect("/admin/clientes")
  },


  desactivarCliente: async (peticion, respuesta) => {
    let id = peticion.params.clienteId
    await Cliente.update({id: id}, {activa: false})
    peticion.addFlash('mensaje', 'Cliente desactivado')
    return respuesta.redirect("/admin/clientes")
  },

  activarCliente: async (peticion, respuesta) => {
    let id = peticion.params.clienteId
    await Cliente.update({id: id}, {activa: true})
    peticion.addFlash('mensaje', 'Cliente activado')
    return respuesta.redirect("/admin/clientes")
  },



};

