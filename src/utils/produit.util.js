const categorieByProduit = (produit) => {
    //select degradation of categorie de produit
   const { souscategorie, ...other } = produit.categorie;
   const { categorie, ...othersous } = souscategorie;
   othersous.sousouscategorie = { ...other };
   let newItem = { ...categorie };
   newItem.souscategorie = { ...othersous };
   return newItem;
 };

 module.exports={
    categorieByProduit
 }