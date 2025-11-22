const mongoose = require("mongoose");

// Schema za alati proizvode
const AlatiProductSchema = new mongoose.Schema(
  {
    naziv: { type: String, required: true },
    dimenzije: { type: String, required: false }, // Made optional for existing data compatibility
    jedinica_mere: { type: String, required: true },
    kolicina_u_pakovanju: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    }, // Made optional for existing data compatibility
    transportno_pakovanje: {
      type: mongoose.Schema.Types.Mixed,
      required: false, // Made optional for existing data compatibility
    },
    sifra_artikla: { type: String, required: true },
    slika: { type: String },
    id: { type: String, required: true, unique: true },
  },
  { _id: false }
);

// Schema za alati kategorije
const AlatiCategorySchema = new mongoose.Schema(
  {
    kategorija: { type: String, required: true },
    artikli: [AlatiProductSchema],
  },
  { _id: false }
);

// Schema za premazi proizvode
const PremaziProductSchema = new mongoose.Schema(
  {
    naziv: { type: String, required: true },
    tip: { type: String, required: true },
    boja: { type: String, required: true },
    temperatura: String,
    svojstva: [String],
    primenjuje_se: [String],
    slika: String,
    id: { type: String, required: true, unique: true },
  },
  { _id: false }
);

// Schema za premazi kategorije
const PremaziCategorySchema = new mongoose.Schema(
  {
    naziv: { type: String, required: true },
    opis: String,
    proizvodi: [PremaziProductSchema],
  },
  { _id: false }
);

// Schema za premazi materijale
const PremaziMaterialSchema = new mongoose.Schema(
  {
    opis: String,
    kategorije: {
      type: Map,
      of: PremaziCategorySchema,
    },
  },
  { _id: false }
);

// Glavna schema za sve proizvode
// Using Schema.Types.Mixed to allow dynamic main categories
const ProductsSchema = new mongoose.Schema(
  {
    alati: [AlatiCategorySchema],
    premazi: {
      type: Map,
      of: PremaziMaterialSchema,
    },
  },
  {
    timestamps: true,
    strict: false, // Allow dynamic properties for main categories
    validateBeforeSave: true, // Keep validation but make fields optional
  }
);

// Model
const Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;
