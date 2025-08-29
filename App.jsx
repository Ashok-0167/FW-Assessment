import React, { useEffect, useState } from "react";

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Increase the number of products fetched to 12 for a larger catalog
    fetch("https://fakestoreapi.com/products?limit=12")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Product Catalog</h1>
      <p style={{ textAlign: "center", color: "#666" }}>Discover amazing products</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              backgroundColor: "#fafafa",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", height: "200px", objectFit: "contain" }}
            />
            <h3 style={{ margin: "15px 0 5px" }}>{product.title}</h3>
            <p style={{ color: "#007bff", margin: "5px 0", cursor: "pointer" }}>
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#555",
                height: "60px",
                overflow: "hidden",
                marginBottom: "10px",
              }}
            >
              {product.description.length > 90
                ? product.description.substring(0, 90) + "..."
                : product.description}
            </p>
            <div style={{ fontWeight: "bold", fontSize: "18px", margin: "10px 0" }}>
              ${product.price.toFixed(2)}{" "}
              <span
                style={{
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  fontSize: "12px",
                  borderRadius: "4px",
                  padding: "2px 6px",
                  marginLeft: "5px",
                }}
              >
                -{(Math.random() * 20).toFixed(2)}%
              </span>
            </div>
            <button
              style={{
                backgroundColor: "#428bca",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                marginTop: "auto",
              }}
              onClick={() => alert(`Viewing details for: ${product.title}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;