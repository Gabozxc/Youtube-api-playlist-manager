import axios from "axios";

export default axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_YOUTUBE}?key=${process.env.NEXT_PUBLIC_GOOGLE}`,
});
