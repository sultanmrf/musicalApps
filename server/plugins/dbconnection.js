import mongoose from "mongoose";

export default async () => {
    const config = useRuntimeConfig();

    try {
        await mongoose.connect(config.dburl);
        console.log("connected successed");
    } catch (err) {
        console.log(err);
    }
}