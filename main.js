import { gql, request, GraphQLClient } from 'graphql-request'
import Alpine from 'alpinejs'
 
window.Alpine = Alpine

Alpine.store('landingPage', {
  miEmpresa: {
    logo: {}
  },
  slider: [{imagen: {}},{imagen: {}},{imagen: {}}],
  about: {
    tituloPrincipal: '',
    informacionComplemetaria: '',
    informacionDestacada: {imagenDestacada: {}},
    informacionDestacada2: {imagenDestacada: {}},
    informacionDestacada3: {imagenDestacada: {}},
  },
  trabajo: {
    trabajos: [
      {imagenJob: {}}, {imagenJob: {}}, {imagenJob: {}}, {imagenJob: {}},
      {imagenJob: {}}, {imagenJob: {}}, {imagenJob: {}}, {imagenJob: {}},
      {imagenJob: {}}, {imagenJob: {}}, {imagenJob: {}}, {imagenJob: {}}
    ]
  },
  servicios: {
    servicios: [
      {}, {}, {},
      {}, {}, {},
      {}, {}, {}
    ]
  },
  aliados: {
    aliados: [
      {imagen: {}}, {imagen: {}}, {imagen: {}}, {imagen: {}}
    ]
  },
  testimoniales: {
    review: [
      {}, {}, {}, {}
    ]
  },
  contacto: {
    mapa: {},
    masInformacionDeContacto: [{}, {}, {}, {}]
  }
})

Alpine.start()

export const ClientGraphQL = ({ query, variables }) => {
  const endpoint = `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${import.meta.env.VITE_DATOCMS_API}`,
    },
  });
  return client.request(query, variables);
};

export const LANDINGPAGE_QUERY = gql`
  query MyQuery {
    landingpage {
      miEmpresa {
        nombre
        descripcion
        correo
        telefono
        linkFacebook
        linkIntagram
        linkTwitter
        logo {
          url
        }
      }
      about {
        tituloPrincipal
        informacionComplemetaria
        informacionDestacada {
          titulo
          subTitulo
          breveDescripcion
          imagenDestacada {
            url
          }
        }
        informacionDestacada2 {
          titulo
          subTitulo
          breveDescripcion
          imagenDestacada {
            url
          }
        }
        informacionDestacada3 {
          titulo
          subTitulo
          breveDescripcion
          imagenDestacada {
            url
          }
        }
      }
      slider {
        tituloPrincipal
        subTitulo
        imagen {
          url
        }
      }
      trabajo {
        tituloPrincipal
        informacionAdicional
        trabajos {
          tituloDelTrabajo
          palabrasClave
          imagenJob {
            url
          }
        }
      }
      servicios {
        tituloPrincipal
        informacionAdicional
        servicios {
          titulo
          descripcion
          icono
        }
        textoBannerDeServicio
      }
      aliados {
        tituloPrincipal
        informacionAdicional
        aliados {
          nombre
          puestoNegocio
          descripcion
          linkTwitter
          linkInstagram
          linkFacebook
          imagen {
            url
          }
        }
      }
      testimoniales {
        tituloPrincipal
        informacionAdicional
        review {
          nombreContacto
          nombreDeNegocioEmpresa
          review
        }
      }
      contacto {
        tituloPrincipal
        informacionAdicional
        mapa {
          url
        }
        masInformacionDeContacto {
          titulo
          descripcion
          icono
        }
      }
    }
  }
`;

const getLandingPageData = () => {
  return ClientGraphQL({
    query: LANDINGPAGE_QUERY,
  });
};


getLandingPageData().then(res => {
  Alpine.store('landingPage').miEmpresa = res.landingpage.miEmpresa;
  Alpine.store('landingPage').slider = res.landingpage.slider;
  Alpine.store('landingPage').about = res.landingpage.about;
  Alpine.store('landingPage').trabajo = res.landingpage.trabajo;
  Alpine.store('landingPage').servicios = res.landingpage.servicios;
  Alpine.store('landingPage').aliados = res.landingpage.aliados;
  Alpine.store('landingPage').testimoniales = res.landingpage.testimoniales;
  Alpine.store('landingPage').contacto = res.landingpage.contacto;
}).catch(err => {
  console.log(err)
})