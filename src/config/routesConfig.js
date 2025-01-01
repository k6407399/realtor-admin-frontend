const routesConfig = {
  // Admin Routes
  adminLogin: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_ADMIN_LOGIN}`,
  adminBlocklist: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_ADMIN_BLOCKLIST}`,
  adminUnblocklist: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_ADMIN_UNBLOCKLIST}`,

  // Form Fields
  formFields: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FORM_FIELDS}`,

  // Land Routes
  land: {
    create: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LAND_CREATE}`,
    fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LAND_FETCH}`,
    update: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LAND_UPDATE}`,
    delete: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LAND_DELETE}`,
  },

  // Flats Routes
  flats: {
    create: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLATS_CREATE}`,
    fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLATS_FETCH}`,
    update: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLATS_UPDATE}`,
    delete: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLATS_DELETE}`,
  },

  // Villas Routes
  villas: {
    create: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VILLAS_CREATE}`,
    fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VILLAS_FETCH}`,
    update: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VILLAS_UPDATE}`,
    delete: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VILLAS_DELETE}`,
  },

  // Apartments Routes
  apartments: {
    create: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_APARTMENTS_CREATE}`,
    fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_APARTMENTS_FETCH}`,
    update: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_APARTMENTS_UPDATE}`,
    delete: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_APARTMENTS_DELETE}`,
  },

  // Approvals
  approvals: {
    fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_APPROVALS_FETCH}`,
    update: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_APPROVALS_UPDATE}`,
  },

  // Appointments
  appointments: {
    fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_APPOINTMENTS_FETCH}`,
    update: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_APPOINTMENTS_UPDATE}`,
    cancel: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_APPOINTMENTS_CANCEL}`,
  },

  // Likes and Wishlist (Optional for Admin Reporting)
  likes: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LIKES_FETCH}`,
  wishlist: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_WISHLIST_FETCH}`,
};

export default routesConfig;
