export const supabaseCDN = (bucket, name) => {
    return `https://anyzlthrxmlnduuesdhk.supabase.co/storage/v1/object/public/${bucket}/${name}`;
};
