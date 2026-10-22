# NOVARCH — Legal Review & Verification Checklist
**Document version:** 1.0  
**Target:** Production release of bilingual legal documentation (`/datenschutz`, `/impressum`, `/legal/winter-arc-2026`)  
**Scope:** Operator disclosures (§ 5 DDG), Privacy Policy (GDPR Art. 13/14), Telecommunications-Telemedia Data Protection (§ 25 TDDDG), and Event Legal Hub terms.

---

## Instructions for Responsible Person / Client
The technical implementation and bilingual German/English legal drafts have been deployed into the codebase with verified facts from the codebase inspection. 

To complete legal verification and authorize final publication, please review and supply the following missing items. None of these unverified placeholders are exposed with draft notices on public production pages.

---

## 1. Operator Identity & Legal Form (§ 5 DDG, § 18 MStV)
Required for `/impressum` and `/datenschutz`:

- [ ] **Exact Legal Operator Name:**  
  *Current placeholder:* NOVARCH  
  *Action:* Provide full registered name (e.g., `NOVARCH GmbH`, `NOVARCH UG (haftungsbeschränkt)`, or `[First Name] [Last Name] Einzelunternehmen`).
- [ ] **Legal Form (Rechtsform):**  
  *Action:* Confirm whether Sole Proprietorship (*Einzelunternehmen*), Partnership (*GbR*), or Corporation (*UG/GmbH*).
- [ ] **Service Address (Ladungsfähige Anschrift):**  
  *Current verified:* Ilmenau, Thüringen, Germany  
  *Action:* Provide street address, house number, and postal code in Ilmenau.
- [ ] **Authorized Representative(s) (Vertretungsberechtigte Person):**  
  *Current verified contact:* Mesum Hafeez  
  *Action:* Confirm full legal name and official title (e.g., Managing Director / *Geschäftsführer* or Owner / *Inhaber*).
- [ ] **Commercial Register (Handelsregister):**  
  *Action:* Provide Register Court (*Amtsgericht*) and Registration Number (*HRB / HRA*), OR explicitly confirm that the entity is not registered in the commercial register.
- [ ] **VAT Identification Number (Umsatzsteuer-Identifikationsnummer):**  
  *Action:* Provide EU VAT ID (`DE...` under § 27a UStG), OR confirm if pending issuance / small business regulation (*Kleinunternehmerregelung § 19 UStG*).

---

## 2. Technical Infrastructure, Hosting & International Transfers (GDPR Art. 13 & 44–49)
Required for `/datenschutz`:

- [ ] **MongoDB Atlas Database Region:**  
  *Current setting in policy:* European Union (EU region, e.g., Frankfurt `eu-central-1`)  
  *Action:* Confirm the exact AWS/GCP/Azure cloud region configured in MongoDB Atlas production cluster.
- [ ] **Production Backend Hosting:**  
  *Current setting:* `https://novarch-backend.vercel.app` (Vercel)  
  *Action:* Confirm whether production backend is hosted on Vercel or a dedicated server/provider.
- [ ] **Data Processing Agreements (DPAs / Auftragsverarbeitungsverträge):**  
  Confirm whether signed DPAs with Standard Contractual Clauses (SCCs) are in place for US-based providers:
  - [ ] Vercel Inc. (Frontend & API edge delivery)
  - [ ] MongoDB, Inc. (Database hosting)
  - [ ] Resend Inc. (Transactional email delivery)
  - [ ] Stripe Inc. (Payment processing)
  - [ ] Google LLC (Translation widget API)

---

## 3. Data Retention & Erasure Periods (GDPR Art. 13(2)(a))
- [ ] **Contact & Service Inquiries (`/contact`, `/services/*`):**  
  *Recommended:* Erased 6–12 months after resolution of inquiry, unless contractual relationship ensues.  
  *Action:* Confirm or adjust this retention window.
- [ ] **Community & Winter Arc Applications (`/our-community`, `/winter-arc`):**  
  *Recommended:* Retained for active membership duration; rejected/withdrawn applicants erased within 6 months.  
  *Action:* Confirm or adjust.
- [ ] **Security Logs & Rate Limiting (`MongoRateStore`):**  
  *Verified in code:* SHA-256 hashed IP addresses are purged automatically via MongoDB TTL index after 15 minutes.  
  *Status:* Verified & documented in privacy policy.
- [ ] **Financial & Payment Evidence (Stripe session/intent IDs):**  
  *Statutory requirement:* Retained for 10 years pursuant to §§ 238, 257 HGB and § 147 AO (German commercial & tax code).  
  *Status:* Documented in privacy policy.

---

## 4. Privacy Contact & DPO Designation (GDPR Art. 37, § 38 BDSG)
- [ ] **Privacy Inquiries Email:**  
  *Verified:* `mesum@novarch.eu`  
  *Status:* Unified across all footer links, legal hub, and legal pages.
- [ ] **Data Protection Officer (DPO / Datenschutzbeauftragter):**  
  *Action:* Confirm whether appointment is legally required (under German § 38 BDSG, generally mandatory if 20 or more persons regularly process personal data automatically, or if high-risk core processing occurs). If appointed, provide DPO contact details.

---

## 5. Telemedia Consent & Google Translate Widget (§ 25 TDDDG)
- [ ] **Widget Behavior:**  
  The Google Translate widget sets a `googtrans` cookie and makes network calls to `translate.google.com`. In the current implementation, it is loaded **only upon explicit user click on the language switcher** (never automatically on page load).  
  *Action:* Legal reviewer to confirm whether explicit user activation is sufficient under § 25 TDDDG or if a formal consent banner/CMP is required.

---

## 6. Event Legal Hub Terms & Confidentiality (`/legal/winter-arc-2026`)
- [ ] **Confidentiality / NDA Terms:**  
  *Action:* Provide approved final German and English wording for the NDA/confidentiality section (`#confidentiality`).
- [ ] **Prize Competition & Challenge Scope:**  
  *Action:* Confirm eligibility rules, closing times, judging criteria, and prize terms when finalized.
- [ ] **On-Site Photography & Media Procedure:**  
  *Action:* Confirm organizer workflow for identifying non-consenting participants during in-person filming.

---

## 7. Sign-Off & Approval
- [ ] **Name of Responsible Person Approving Publication:**  
  `____________________________________________________`
- [ ] **Date of Final Legal Approval:**  
  `____________________________________________________`
