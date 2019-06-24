// import something here
import VueGeolocation from "vue-browser-geolocation";

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  console.log("usou", VueGeolocation);
  Vue.use(VueGeolocation);
};
