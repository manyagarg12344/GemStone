import React, { useState } from "react";
import { useLang } from "../context/LanguageContext";
import { createRecommendation } from "../utils/api";

/**
 * RecommendForm — collects user details, validates them, calls the API,
 * and invokes onSuccess(data) when a recommendation is returned.
 */
const RecommendForm = ({ onSuccess }) => {
  const { t, lang } = useLang();

  const [values, setValues] = useState({ name: "", dob: "", gender: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    if (!values.name.trim()) {
      errs.name = t("nameRequired");
    } else if (values.name.trim().length < 2) {
      errs.name = t("nameShort");
    }
    if (!values.dob) {
      errs.dob = t("dobRequired");
    } else if (new Date(values.dob) > new Date()) {
      errs.dob = t("dobFuture");
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setApiError("");
    try {
      const res = await createRecommendation({ ...values, language: lang });
      if (res.success) {
        onSuccess(res.data);
      } else {
        setApiError(res.message || t("error"));
      }
    } catch (err) {
      setApiError(err.message || t("error"));
    } finally {
      setLoading(false);
    }
  };

  // Max date = today (no future DOBs)
  const maxDate = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div className="form-group">
        <label className="form-label" htmlFor="name">
          {t("nameLabel")} <span className="required">*</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className={`form-control ${errors.name ? "error" : ""}`}
          placeholder={t("namePlaceholder")}
          value={values.name}
          onChange={handleChange}
          autoComplete="name"
          maxLength={50}
        />
        {errors.name && (
          <p className="form-error">⚠️ {errors.name}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div className="form-group">
        <label className="form-label" htmlFor="dob">
          {t("dobLabel")} <span className="required">*</span>
        </label>
        <input
          id="dob"
          type="date"
          name="dob"
          className={`form-control ${errors.dob ? "error" : ""}`}
          value={values.dob}
          onChange={handleChange}
          max={maxDate}
          min="1900-01-01"
        />
        {errors.dob && (
          <p className="form-error">⚠️ {errors.dob}</p>
        )}
      </div>

      {/* Gender (optional) */}
      <div className="form-group">
        <label className="form-label" htmlFor="gender">
          {t("genderLabel")}
        </label>
        <select
          id="gender"
          name="gender"
          className="form-control"
          value={values.gender}
          onChange={handleChange}
        >
          {Object.entries(t("genderOptions")).map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* API error */}
      {apiError && (
        <div
          style={{
            background: "rgba(244,63,94,0.08)",
            border: "1px solid rgba(244,63,94,0.25)",
            borderRadius: "var(--radius-md)",
            padding: "12px 16px",
            marginBottom: "20px",
            color: "var(--gem-rose)",
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          ❌ {apiError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary btn-lg"
        style={{ width: "100%", justifyContent: "center" }}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />
            {t("submitting")}
          </>
        ) : (
          t("submitBtn")
        )}
      </button>
    </form>
  );
};

export default RecommendForm;
