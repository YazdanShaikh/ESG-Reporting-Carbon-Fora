export const TOPIC_DATA = {
    "GRI 201": {
        topic: "Economic Performance",
        description: "Revenue, profit, loss, financial performance, economic impact, operating cost, investment, growth, expenditure, financial risk.",
        questions: [
            "Do your activities significantly affect your organization’s financial stability?",
            "Do your operations affect economic conditions of employees or communities?",
            "Do financial risks or opportunities influence long-term performance?"
        ],
        info: [
            "Stability of your business income and ability to survive financial risks.",
            "How your business supports employee salaries and local income.",
            "Ability of your business to grow and remain profitable in future."
        ],
        predefinedImpacts: [
            "Financial resilience",
            "Employee & community economic well-being",
            "Long-term value creation"
        ]
    },
    "GRI 202": {
        topic: "Market Presence",
        description: "Market presence, local hiring, local workforce, wage levels, minimum wage, pay ratio, senior management local, regional employment, local economy, economic contribution.",
        questions: [
            "Do wage levels differ significantly from local market wages?",
            "Does your organization significantly affect local employment?",
            "Do senior managers come from local communities?"
        ],
        info: [
            "Whether employees are paid fairly compared to local market wages.",
            "Jobs created for local people.",
            "Whether senior managers are hired locally."
        ],
        predefinedImpacts: [
            "Wage fairness",
            "Local employment levels",
            "Local leadership inclusion"
        ]
    },
    "GRI 203": {
        topic: "Indirect Economic Impacts",
        description: "Indirect impact, community development, infrastructure, local economy, economic development, livelihoods, social investment, community investment, regional development, public infrastructure.",
        questions: [
            "Do your operations affect local or regional economic development?",
            "Do your activities improve or harm infrastructure or public services?",
            "Do communities depend economically on your operations?"
        ],
        info: [
            "How your business supports the local economy.",
            "Impact on roads, utilities, schools, and hospitals.",
            "Whether the community depends heavily on your business for income."
        ],
        predefinedImpacts: [
            "Local economic development",
            "Infrastructure & public services",
            "Community economic dependency"
        ]
    },
    "GRI 204": {
        topic: "Procurement Practices",
        description: "Procurement, purchasing, sourcing, local suppliers, supplier selection, vendor, supply base, purchasing policy, contract award, responsible procurement.",
        questions: [
            "Do your purchasing practices affect supplier financial stability?",
            "Are suppliers dependent on your organization for revenue?",
            "Do payment terms create pressure on suppliers?"
        ],
        info: [
            "Whether your purchasing decisions affect supplier survival.",
            "Whether suppliers rely heavily on your company for income.",
            "Whether payment delays create financial pressure on suppliers."
        ],
        predefinedImpacts: [
            "Supplier financial stability",
            "Supplier dependency",
            "Supplier cash-flow pressure"
        ]
    },
    "GRI 205": {
        topic: "Anti-Corruption",
        description: "Corruption, bribery, fraud, unethical, misconduct, anti-bribery, whistleblower, compliance, integrity, corruption risk.",
        questions: [
            "Is there a risk of corruption or bribery in your operations?",
            "Do employees interact with public officials?",
            "Do you operate in countries with high corruption risk?"
        ],
        info: [
            "Risk of bribery or corruption in your operations.",
            "Interactions with government officials must follow legal rules.",
            "Risk of operating in countries or sectors with bribery risk."
        ],
        predefinedImpacts: [
            "Ethical integrity",
            "Compliance with public ethics",
            "Corruption exposure"
        ]
    },
    "GRI 206": {
        topic: "Anti-Competitive Behavior",
        description: "Competition, anti-competitive, monopoly, price fixing, cartel, unfair competition, market dominance, regulatory violation, trade practices, competition law.",
        questions: [
            "Could your practices affect fair market competition?",
            "Do you hold a strong or dominant market position?",
            "Are there risks of anti-competitive conduct?"
        ],
        info: [
            "Avoiding unfair business practices against competitors.",
            "Risk of controlling too much market share unfairly.",
            "Risk of fines or damage to company reputation."
        ],
        predefinedImpacts: [
            "Fair competition",
            "Market dominance impact",
            "Legal & reputational risk"
        ]
    },
    "GRI 207": {
        topic: "Tax",
        description: "Tax, taxation, tax payments, corporate tax, income tax, tax compliance, tax transparency, tax policy, tax authority, tax reporting.",
        questions: [
            "Do you operate in multiple tax jurisdictions?",
            "Is tax transparency important to stakeholders?",
            "Are complex tax structures used?"
        ],
        info: [
            "Difficulty of managing taxes in different countries.",
            "Openness about paying taxes properly.",
            "Risk from complex or aggressive tax structures."
        ],
        predefinedImpacts: [
            "Tax compliance complexity",
            "Tax transparency",
            "Tax governance risk"
        ]
    },
    "GRI 301": {
        topic: "Materials",
        description: "Materials, raw materials, material use, recycled materials, virgin materials, packaging, material sourcing, resource use, material efficiency, sustainable materials.",
        questions: [
            "Do you use large quantities of raw materials?",
            "Do you rely on non-renewable materials?",
            "Do material choices have environmental impacts?"
        ],
        info: [
            "Amount of raw materials used.",
            "Use of non-renewable materials like oil or metals.",
            "Overall environmental impact of materials used."
        ],
        predefinedImpacts: [
            "Resource consumption",
            "Resource depletion",
            "Environmental footprint"
        ]
    },
    "GRI 302": {
        topic: "Energy",
        description: "Energy, electricity, fuel, diesel, natural gas, renewable energy, energy efficiency, power consumption, energy use, non-renewable.",
        questions: [
            "Do your operations consume significant energy?",
            "Do you rely on fossil fuels?",
            "Is energy efficiency a concern?"
        ],
        info: [
            "Total electricity and fuel used.",
            "Reliance on diesel, petrol, and gas.",
            "How efficiently energy is used."
        ],
        predefinedImpacts: [
            "Energy consumption",
            "Fossil fuel dependence",
            "Energy efficiency performance"
        ]
    },
    "GRI 303": {
        topic: "Water & Effluents",
        description: "Water, water use, water withdrawal, water scarcity, effluent, wastewater, discharge, water stress, groundwater, water pollution.",
        questions: [
            "Do you withdraw significant amounts of water?",
            "Do you discharge wastewater or effluents?",
            "Do you operate in water-stressed areas?"
        ],
        info: [
            "Amount of water used and impact on supply.",
            "Wastewater discharge affecting water quality.",
            "Operating in areas with limited water supply."
        ],
        predefinedImpacts: [
            "Water availability",
            "Water pollution",
            "Water stress risk"
        ]
    },
    "GRI 304": {
        topic: "Biodiversity",
        description: "Biodiversity, ecosystem, habitat, protected area, deforestation, wildlife, species, land use, conservation, ecological impact.",
        questions: [
            "Do operations affect land, habitats, or wildlife?",
            "Are activities near protected or sensitive areas?",
            "Do suppliers impact biodiversity?"
        ],
        info: [
            "Impact on land, wildlife, or natural habitats.",
            "Operations near protected environmental zones.",
            "Environmental impact caused by suppliers."
        ],
        predefinedImpacts: [
            "Habitat disruption",
            "Protected area impact",
            "Supply-chain biodiversity impact"
        ]
    },
    "GRI 305": {
        topic: "Emissions",
        description: "Emissions to air, including GHG and pollutants.",
        questions: [
            "Do your operations generate greenhouse gas emissions?",
            "Do activities cause air pollution?",
            "Do logistics or transportation create emissions?",
            "Do suppliers contribute to emissions?",
            "Are there community health impacts?",
            "Are there regulatory or legal impacts?"
        ],
        info: [
            "Emissions from fuel, diesel, gas, generators, company vehicles.",
            "Smoke, dust, fumes, or bad smells affecting nearby areas.",
            "Pollution caused by delivery trucks, logistics, and shipping.",
            "Pollution created by companies that supply your materials or products.",
            "Health effects on nearby residents due to noise, pollution, or traffic.",
            "Risk of fines or damage to company reputation."
        ],
        predefinedImpacts: [
            "Direct GHG emissions",
            "Local air pollution",
            "Transport emissions",
            "Supplier emissions",
            "Community health impacts",
            "Regulatory & legal compliance impact"
        ]
    },
    "GRI 306": {
        topic: "Waste",
        description: "Waste, solid waste, hazardous waste, recycling, landfill, waste disposal, waste management, plastic waste, incineration, scrap.",
        questions: [
            "Do you generate hazardous waste?",
            "Do you generate large volumes of non-hazardous waste?",
            "Are waste disposal practices a risk?"
        ],
        info: [
            "Waste that is dangerous such as chemicals, oil, or batteries.",
            "Total waste produced.",
            "Risk of improper waste disposal."
        ],
        predefinedImpacts: [
            "Hazardous waste risk",
            "Waste generation",
            "Waste management risk"
        ]
    },
    "GRI 308": {
        topic: "Supplier Environmental Assessment",
        description: "Supplier environment, environmental assessment, supplier audit, environmental risk, supply chain environment, vendor compliance, supplier screening, environmental criteria, supplier evaluation, third-party environment.",
        questions: [
            "Do suppliers have significant environmental impacts?",
            "Are suppliers located in high-risk environmental regions?",
            "Is supplier environmental monitoring limited?"
        ],
        info: [
            "Environmental impact caused by suppliers.",
            "Buying materials from environmentally sensitive regions.",
            "Weak monitoring of supplier environmental performance."
        ],
        predefinedImpacts: [
            "Supplier environmental footprint",
            "Environmental sourcing risk",
            "Environmental oversight gaps"
        ]
    },
    "GRI 401": {
        topic: "Employment",
        description: "Employment, hiring, recruitment, turnover, resignation, workforce, contracts, wages, salaries, benefits.",
        questions: [
            "Do you use temporary or contract workers?",
            "Are job security or fair wages a concern?",
            "Is employee turnover high?"
        ],
        info: [
            "Stability of employment for workers.",
            "Paying wages fairly.",
            "Employee turnover rate."
        ],
        predefinedImpacts: [
            "Job security",
            "Fair compensation",
            "Workforce stability"
        ]
    },
    "GRI 402": {
        topic: "Labor / Management Relations",
        description: "Labor relations, management relations, employee dialogue, workforce consultation, change management, labor dispute, employee communication, worker engagement, negotiation, industrial relations.",
        questions: [
            "Are employees represented by unions?",
            "Have labor disputes or grievances occurred?",
            "Are major organizational changes planned?"
        ],
        info: [
            "Whether workers are represented by unions.",
            "Risk of disputes or strikes.",
            "Impact of major company changes on employees."
        ],
        predefinedImpacts: [
            "Employee representation",
            "Labor relations stability",
            "Change management impact"
        ]
    },
    "GRI 403": {
        topic: "Occupational Health & Safety",
        description: "Safety, injury, accident, incident, lost time, fatality, hazard, workplace safety, PPE, health risk.",
        questions: [
            "Do workers face injury or health risks?",
            "Are hazardous tasks or equipment used?",
            "Have accidents or near-misses occurred?"
        ],
        info: [
            "Risk of workplace injuries.",
            "Exposure to hazardous tasks or equipment.",
            "History of accidents or near-misses."
        ],
        predefinedImpacts: [
            "Worker safety",
            "Occupational risk exposure",
            "Safety incident risk"
        ]
    },
    "GRI 404": {
        topic: "Training & Education",
        description: "Training, education, learning, skills, development, capacity building, workshops, upskilling, reskilling, employee growth.",
        questions: [
            "Do employees require training to work safely?",
            "Are skills gaps affecting performance?",
            "Is access to training uneven?"
        ],
        info: [
            "Whether employees receive proper training.",
            "Skill level of employees.",
            "Fair access to training opportunities."
        ],
        predefinedImpacts: [
            "Training adequacy",
            "Workforce capability",
            "Equal learning access"
        ]
    },
    "GRI 405": {
        topic: "Diversity & Equal Opportunity",
        description: "Diversity, inclusion, gender, equality, women, minority, equal opportunity, pay gap, inclusion policy, representation.",
        questions: [
            "Are certain groups underrepresented?",
            "Is unequal treatment a risk?",
            "Are diversity policies not fully implemented?"
        ],
        info: [
            "Representation of different genders and groups.",
            "Fair treatment in hiring and promotion.",
            "Whether diversity policies work in practice."
        ],
        predefinedImpacts: [
            "Workforce diversity",
            "Equal opportunity",
            "Inclusion effectiveness"
        ]
    },
    "GRI 406": {
        topic: "Non-Discrimination",
        description: "Discrimination, harassment, bias, unfair treatment, grievance, complaint, misconduct, retaliation, abuse, unequal treatment.",
        questions: [
            "Have discrimination complaints occurred?",
            "Are grievance mechanisms ineffective?",
            "Are discrimination risks present in operations or supply chain?"
        ],
        info: [
            "Risk of unfair treatment.",
            "Ability of workers to raise complaints safely.",
            "Risk of human rights violations in operations."
        ],
        predefinedImpacts: [
            "Workplace discrimination",
            "Access to remedy",
            "Human rights risk"
        ]
    },
    "GRI 407": {
        topic: "Freedom of Association & Collective Bargaining",
        description: "Freedom of association, collective bargaining, labor union, trade union, worker rights, bargaining agreement, union membership, employee representation, labor rights, worker committee.",
        questions: [
            "Are workers’ rights to organize restricted?",
            "Do suppliers operate in countries with limited labor rights?",
            "Have freedom-of-association issues occurred?"
        ],
        info: [
            "Right of workers to form unions.",
            "Labor conditions at supplier level.",
            "Worker representation risk."
        ],
        predefinedImpacts: [
            "Freedom of association",
            "Supply-chain labor rights",
            "Worker representation risk"
        ]
    },
    "GRI 408": {
        topic: "Child Labor",
        description: "Child labor, underage, minors, young workers, exploitation, illegal labor, child rights, labor violation, supply chain child labor, forced schooling.",
        questions: [
            "Do suppliers operate in high-risk countries?",
            "Is supply chain transparency limited?",
            "Are informal labor practices used?"
        ],
        info: [
            "Risk of underage workers in supply chain.",
            "Supply-chain visibility.",
            "Use of undocumented or informal workers."
        ],
        predefinedImpacts: [
            "Child labor risk",
            "Supply-chain visibility",
            "Informal labor exposure"
        ]
    },
    "GRI 409": {
        topic: "Forced or Compulsory Labor",
        description: "Forced labor, bonded labor, compulsory work, human trafficking, modern slavery, coercion, involuntary labor, exploitation, passport retention, labor abuse.",
        questions: [
            "Are migrant or agency workers used?",
            "Are suppliers located in high-risk regions?",
            "Are recruitment practices monitored?"
        ],
        info: [
            "Risk of workers being forced or exploited.",
            "Forced labor exposure.",
            "Fair hiring practices."
        ],
        predefinedImpacts: [
            "Forced labor vulnerability",
            "Forced labor exposure",
            "Ethical recruitment"
        ]
    },
    "GRI 410": {
        topic: "Security Practices",
        description: "Security practices, security personnel, guards, use of force, human rights training, security risk, violence, misconduct, armed security, safety incident.",
        questions: [
            "Are security personnel used at sites?",
            "Could security actions affect human rights?",
            "Are third-party security providers engaged?"
        ],
        info: [
            "Risk of security staff violating human rights.",
            "Risk of excessive force by security personnel.",
            "Monitoring of third-party security providers."
        ],
        predefinedImpacts: [
            "Human rights & security",
            "Use-of-force risk",
            "Security oversight"
        ]
    },
    "GRI 411": {
        topic: "Rights of Indigenous Peoples",
        description: "Indigenous, indigenous peoples, tribal, native communities, land rights, ancestral land, cultural heritage, traditional land, community consent, displacement.",
        questions: [
            "Do operations occur near indigenous communities?",
            "Is land access or consent required?",
            "Have indigenous rights concerns been raised?"
        ],
        info: [
            "Respecting land and rights of indigenous groups.",
            "Permission required before using land.",
            "Indigenous rights risk."
        ],
        predefinedImpacts: [
            "Indigenous community rights",
            "Land & consent rights",
            "Indigenous rights risk"
        ]
    },
    "GRI 413": {
        topic: "Local Communities",
        description: "Local communities, community engagement, community impact, social impact, resettlement, displacement, community complaints, stakeholder dialogue, social license, community development.",
        questions: [
            "Do operations affect local communities?",
            "Could noise, pollution, traffic, or land use cause harm?",
            "Have community complaints occurred?"
        ],
        info: [
            "Impact of operations on local residents.",
            "Noise, pollution, or traffic affecting communities.",
            "Complaints or conflicts with local people."
        ],
        predefinedImpacts: [
            "Community well-being",
            "Community disturbance",
            "Community relations"
        ]
    },
    "GRI 414": {
        topic: "Supplier Social Assessment",
        description: "Supplier social, supplier audit, labor practices, supply chain labor, vendor assessment, contractor practices, supplier code, third-party labor, human rights supplier, supplier evaluation.",
        questions: [
            "Do suppliers affect labor or human rights?",
            "Is supplier social monitoring limited?",
            "Are high-risk suppliers used?"
        ],
        info: [
            "Labor and human rights practices of suppliers.",
            "Weak monitoring of supplier labor practices.",
            "Risk of social issues in supplier network."
        ],
        predefinedImpacts: [
            "Supplier human rights impact",
            "Social oversight gaps",
            "Supply-chain social risk"
        ]
    },
    "GRI 415": {
        topic: "Public Policy",
        description: "Public policy, lobbying, political engagement, advocacy, policy influence, government relations, political contribution, legislation, regulation, public affairs.",
        questions: [
            "Do you engage in lobbying or political activities?",
            "Are political contributions made?",
            "Could public policy engagement affect trust?"
        ],
        info: [
            "Company involvement in lobbying or political influence.",
            "Disclosure of political donations.",
            "Public trust in company’s political actions."
        ],
        predefinedImpacts: [
            "Policy influence",
            "Political transparency",
            "Stakeholder trust"
        ]
    },
    "GRI 416": {
        topic: "Customer Health & Safety",
        description: "Customer safety, product safety, health risk, consumer protection, product quality, recalls, safety standards, harmful products, compliance, customer complaints.",
        questions: [
            "Could products or services cause harm?",
            "Have customer safety incidents occurred?",
            "Are product safety controls critical?"
        ],
        info: [
            "Risk of product or service causing harm.",
            "Incidents related to product defects.",
            "Systems to prevent customer harm."
        ],
        predefinedImpacts: [
            "Customer safety",
            "Product safety risk",
            "Safety management"
        ]
    },
    "GRI 417": {
        topic: "Marketing & Labeling",
        description: "Marketing, labeling, product information, advertising, misleading claims, sustainability claims, consumer information, product disclosure, packaging labels, compliance.",
        questions: [
            "Could marketing be misleading?",
            "Are product claims regulated?",
            "Have customer complaints occurred?"
        ],
        info: [
            "Risk of misleading marketing.",
            "Following advertising regulations.",
            "Reputation risk from false claims."
        ],
        predefinedImpacts: [
            "Consumer trust",
            "Marketing compliance",
            "Brand credibility"
        ]
    },
    "GRI 418": {
        topic: "Customer Privacy",
        description: "Customer privacy, data privacy, personal data, data protection, confidentiality, GDPR, data breach, information security, cyber security, privacy policy.",
        questions: [
            "Do you collect or store personal data?",
            "Is sensitive customer data processed?",
            "Is there risk of data misuse or breach?"
        ],
        info: [
            "Protection of personal information.",
            "Risk of data leaks or hacking.",
            "Risk of misuse of personal information."
        ],
        predefinedImpacts: [
            "Data privacy",
            "Data security",
            "Privacy breach risk"
        ]
    }
};
