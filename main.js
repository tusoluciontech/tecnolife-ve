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
    aliados: []
  },
  testimoniales: {
    review: []
  },
  contacto: {
    mapa: {},
    masInformacionDeContacto: [{}, {}, {}, {}]
  },
  pagina1: {
    header: {
      image: {}
    },
    servicios: { servicios: [{}, {}, {}, {}, {}, {}, {}, {}, {}] },
  },
  pagina2: {
    header: {
      image: {}
    },
    servicios: { servicios: [{}, {}, {}, {}, {}, {}, {}, {}, {}] },
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
        direccion
        rif
        linkFacebook
        linkIntagram
        linkTwitter
        linkMercadoLibre
        linkTiktok
        linkWhatsapp
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
        bannerOurService {
          url
        }
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
          linkWeb
          imagen {
            url
          }
        }
      }
      testimoniales {
        tituloPrincipal
        informacionAdicional
        review {
          titulo
          descripcion
          imagen {
            url
          }
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
      pagina1 {
        header {
          titulo
          descripcion
          image {
            url
          }
          callToActionLink
          callToActionText
        }
        planes {
          titulo
          simboloMoneda
          precio
          icono
          callToActionUrl
          callToActionText
          caracteristicas {
            feature
          }
        }
        servicios {
          tituloPrincipal
          informacionAdicional
          textoBannerDeServicio
          servicios {
            titulo
            link
            icono
            descripcion
          }
        }
      }
      pagina2 {
        header {
          titulo
          descripcion
          image {
            url
          }
          callToActionLink
          callToActionText
        }
        planes {
          titulo
          simboloMoneda
          precio
          icono
          callToActionUrl
          callToActionText
          caracteristicas {
            feature
          }
        }
        servicios {
          tituloPrincipal
          informacionAdicional
          textoBannerDeServicio
          servicios {
            titulo
            link
            icono
            descripcion
          }
        }
      }
    }
  }
`;

const getLandingPageData = async () => {
  return await ClientGraphQL({
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
  Alpine.store('landingPage').pagina1 = res.landingpage.pagina1;
  Alpine.store('landingPage').pagina2 = res.landingpage.pagina2;
}).catch(err => {
  console.log(err)
})