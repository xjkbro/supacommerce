export const supabaseCDN = (bucket, path, name) => {
    return `https://anyzlthrxmlnduuesdhk.supabase.co/storage/v1/object/public/${bucket}/${path}/${name}`;
};
