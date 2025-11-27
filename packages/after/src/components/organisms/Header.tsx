import React from "react";

export const Header: React.FC = () => {
  return (
    <header
      className="bg-card border-b border-border shadow-sm sticky top-0 z-[1000]"
      style={{
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
      }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
        }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#007bff",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "20px",
            }}>
            L
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground m-0 leading-none">
              Hanghae Company
            </h1>
            <p className="text-[11px] text-muted-foreground m-0 leading-none mt-0.5">
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* User Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
          <div
            style={{
              textAlign: "right",
            }}>
            <div className="text-sm font-semibold text-foreground">
              Demo User
            </div>
            <p className="text-xs text-muted-foreground">
              demo@example.com
            </p>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#e3f2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#007bff",
              fontWeight: "600",
              fontSize: "16px",
            }}>
            DU
          </div>
        </div>
      </div>
    </header>
  );
};
