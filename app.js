const vendors = [
  "Oracle",
  "SAP",
  "Microsoft",
  "Infor",
  "Epicor",
  "Workday",
  "Acumatica",
  "Sage",
  "Odoo",
  "IFS"
];

const featureMatrix = [
  { vendor: "Oracle", finance: "✓", inventory: "✓", procurement: "✓", manufacturing: "✓", crm: "△", analytics: "✓", global: "✓" },
  { vendor: "SAP", finance: "✓", inventory: "✓", procurement: "✓", manufacturing: "✓", crm: "△", analytics: "✓", global: "✓" },
  { vendor: "Microsoft", finance: "✓", inventory: "✓", procurement: "✓", manufacturing: "△", crm: "✓", analytics: "✓", global: "✓" },
  { vendor: "Infor", finance: "✓", inventory: "✓", procurement: "✓", manufacturing: "✓", crm: "△", analytics: "✓", global: "△" },
  { vendor: "Epicor", finance: "✓", inventory: "✓", procurement: "✓", manufacturing: "✓", crm: "△", analytics: "△", global: "△" },
  { vendor: "Workday", finance: "✓", inventory: "△", procurement: "✓", manufacturing: "—", crm: "—", analytics: "✓", global: "✓" },
  { vendor: "Acumatica", finance: "✓", inventory: "✓", procurement: "✓", manufacturing: "△", crm: "✓", analytics: "△", global: "△" },
  { vendor: "Sage", finance: "✓", inventory: "△", procurement: "△", manufacturing: "△", crm: "△", analytics: "△", global: "△" },
  { vendor: "Odoo", finance: "✓", inventory: "✓", procurement: "✓", manufacturing: "✓", crm: "✓", analytics: "△", global: "△" },
  { vendor: "IFS", finance: "✓", inventory: "✓", procurement: "✓", manufacturing: "✓", crm: "△", analytics: "✓", global: "✓" }
];

const partners = [
  { name: "BluePeak ERP Advisory", industry: "Manufacturing", oems: ["SAP", "Oracle", "IFS"], successRate: "93%" },
  { name: "NorthGrid Solutions", industry: "Retail", oems: ["Microsoft", "Sage", "Odoo"], successRate: "90%" },
  { name: "ScaleForge Consulting", industry: "Services", oems: ["Workday", "Oracle", "Acumatica"], successRate: "95%" },
  { name: "SprintOps Implementers", industry: "SaaS", oems: ["Odoo", "Acumatica", "Microsoft"], successRate: "89%" }
];

function renderVendors() {
  const vendorList = document.getElementById("vendorList");
  const leadVendor = document.getElementById("leadVendor");

  vendors.forEach((vendor) => {
    const li = document.createElement("li");
    li.textContent = vendor;
    vendorList.appendChild(li);

    const option = document.createElement("option");
    option.value = vendor;
    option.textContent = vendor;
    leadVendor.appendChild(option);
  });
}

function renderFeatureMatrix() {
  const tbody = document.querySelector("#featureTable tbody");
  featureMatrix.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.vendor}</td>
      <td>${item.finance}</td>
      <td>${item.inventory}</td>
      <td>${item.procurement}</td>
      <td>${item.manufacturing}</td>
      <td>${item.crm}</td>
      <td>${item.analytics}</td>
      <td>${item.global}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderPartners(filter = "all") {
  const cards = document.getElementById("partnerCards");
  cards.innerHTML = "";

  partners
    .filter((partner) => filter === "all" || partner.industry === filter)
    .forEach((partner) => {
      const div = document.createElement("article");
      div.className = "card";
      div.innerHTML = `
        <h3>${partner.name}</h3>
        <p><strong>Industry:</strong> ${partner.industry}</p>
        <p><strong>OEMs:</strong> ${partner.oems.join(", ")}</p>
        <p><strong>Success Rate:</strong> ${partner.successRate}</p>
      `;
      cards.appendChild(div);
    });
}

document.getElementById("assessmentForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const company = document.getElementById("company").value;
  const employees = Number(document.getElementById("employees").value);
  const complexity = Number(document.getElementById("complexity").value);
  const dataQuality = Number(document.getElementById("dataQuality").value);
  const processMaturity = Number(document.getElementById("processMaturity").value);

  const score = Math.max(0, Math.min(100, Math.round((employees + processMaturity * 12 + dataQuality * 10) - complexity * 8)));
  const complexityIndex = Math.max(0, Math.min(100, Math.round(complexity * 18 + (6 - dataQuality) * 9)));

  let status = "High Readiness";
  if (score < 75) status = "Moderate Readiness";
  if (score < 55) status = "Needs Preparation";

  document.getElementById("assessmentResult").textContent =
    `${company} readiness score: ${score}/100 (${status})\n` +
    `Complexity index: ${complexityIndex}/100\n` +
    `Suggested next step: Validate master data and integration map before vendor demos.`;
});

document.getElementById("calcForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const users = Number(document.getElementById("users").value);
  const licenseCost = Number(document.getElementById("licenseCost").value);
  const implementationCost = Number(document.getElementById("implementationCost").value);
  const integrationCost = Number(document.getElementById("integrationCost").value);
  const supportCost = Number(document.getElementById("supportCost").value);
  const annualSavings = Number(document.getElementById("annualSavings").value);

  const annualLicense = users * licenseCost * 12;
  const yearOneTco = annualLicense + implementationCost + integrationCost + supportCost;
  const paybackMonths = annualSavings > 0 ? Math.round((yearOneTco / annualSavings) * 12) : "N/A";
  const roi = yearOneTco > 0 ? Math.round(((annualSavings - yearOneTco) / yearOneTco) * 100) : 0;

  document.getElementById("calcResult").textContent =
    `Year-1 TCO: ₹${yearOneTco.toLocaleString("en-IN")}\n` +
    `Estimated ROI (Year 1): ${roi}%\n` +
    `Estimated Payback: ${paybackMonths} months`;
});

document.getElementById("industryFilter").addEventListener("change", (event) => {
  renderPartners(event.target.value);
});

document.getElementById("partnerLeadForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("leadName").value;
  const vendor = document.getElementById("leadVendor").value;

  document.getElementById("leadResult").textContent =
    `Thanks ${name}. Your lead was captured for ${vendor}.\n` +
    `Phase 1 behavior: send to admin dashboard + selected partner queue.`;
});

function buildRfpText() {
  const project = document.getElementById("rfpProject").value;
  const industry = document.getElementById("rfpIndustry").value;
  const modules = document.getElementById("rfpModules").value;
  const goLive = document.getElementById("rfpGoLive").value;

  return `RFP DRAFT - ERP-Nav\n\nProject: ${project}\nIndustry: ${industry}\nRequired Modules: ${modules}\nTarget Go-Live: ${goLive}\n\nScope Highlights:\n- Discovery and fit-gap workshop\n- Data migration and validation\n- Integration setup\n- Training and change management\n- Go-live + hypercare\n\nRequested Partner Inputs:\n- Delivery approach and timeline\n- Team composition and certifications\n- Estimated implementation pricing\n- Reference projects\n`;
}

document.getElementById("rfpForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const text = buildRfpText();
  document.getElementById("rfpOutput").textContent = text;
});

document.getElementById("downloadRfp").addEventListener("click", () => {
  const text = buildRfpText();
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "erp-nav-rfp.txt";
  link.click();
  URL.revokeObjectURL(url);
});

renderVendors();
renderFeatureMatrix();
renderPartners();
