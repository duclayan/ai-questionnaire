export const Questions = [
  // General Information
  {
    question_id: 1,
    prompt: "Correct the capitalization of the name of application",
    category: "General Information",
    question: "Name of application",
  },
  {
    question_id: 2,
    prompt: "Correct the capitalization of the name of the contact person",
    category: "General Information",
    question: "Contact person",
  },
  {
    question_id: 3,
    prompt: "Improve writing",
    category: "General Information",
    question:
      "Describe the main business purposes of the application. Companies or consumers in scope",
  },
  {
    question_id: 4,
    prompt:
      "Depending on regions there must be specific requirements. E.g. in EU follow GDPR, data should not be hosted outsquestion_ide of EU. In other countries less restrictions. In China and Russia data must be kept insquestion_ide the same country. Add this information into the prompt and let GPT generate the controls.",
    category: "General Information",
    question:
      "Describe the main business purposes of the application. Companies or consumers in scope",
  },
  {
    question_id: 5,
    prompt:
      "Extract the information and use them across the entire prompting. E.g. this is a confquestion_idential application (public, internal, confquestion_idential, secret). Based on this classification recommend the corresponding controls.",
    category: "General Information",
    question:
      "Describe the level of confquestion_identiality, integrity and availability. Examples for confquestion_identiality: public, internal, confquestion_idential, secret. Example for availabilty: standard or critical. Example for integrity: standard or critical. If the app includes personal sensitive data such as credit card number, motion data, sexual preference etc.? All can be can also be implemented as check boxes.",
  },
  {
    question_id: 6,
    prompt: "Personal sensitive data -> strict controls",
    category: "General Information",
    question:
      "Kind of application: SaaS, completely Self developed, or indivquestion_idual coding based on existing products",
  },
  {
    question_id: 7,
    prompt:
      " Ask if any industry specific security requirements are necessary.",
    category: "General Information",
    question:
      "Industry of the application (Example: automotive, health, public sector, financial, consumer, telecom, machinery, chemistry, service, consulting, education)",
  },
  {
    question_id: 8,
    prompt:
      "In case of SaaS the certification must be related to the SaaS software. In other cases the certification is related to the (cloud) hosting environment. Judge if the certification is available or not, and if it is sufficient.",
    category: "General Information",
    question: "Any certification available (e.g. SOC2 type2, ISO27001 etc.).",
  },
  // Authentication Authorization Concept
  {
    question_id: 9,
    prompt:
      "Say that company authorized SSO should always be preferred over the built-in authentication of the application. Only in the case of few users, it makes no sense to integrate SSO since it causes too much efforts",
    category: "Authentication Authorization Concept",
    question:
      "Do you use a company wquestion_ide SSO system or a built-in authentication of the application?",
  },
  {
    question_id: 10,
    prompt: "Describe the company’s password policy, MFA etc.",
    category: "Authentication Authorization Concept",
    question:
      "What authentication mechanism is being used for the web application? Is it based on passwords, multi-factor authentication, or some other method?",
  },
  {
    question_id: 11,
    prompt:
      "Describe a secure account creation and management process. Describe how to prevent unauthorized account creation or modification.",
    category: "Authentication Authorization Concept",
    question: "Is account creation and management secure?",
  },
  {
    question_id: 12,
    prompt:
      "Based on the described technology, describe best practice according",
    category: "Authentication Authorization Concept",
    question:
      "What authorization mechanism is being used for the web application? Describe technology.",
  },
  {
    question_id: 13,
    prompt:
      "Describe which function should be used based on the given programming language and framework. Mention hash and salt.",
    category: "Authentication Authorization Concept",
    question:
      "Where are user credentials stored? Which programming language or framework is used.",
  },
  {
    question_id: 14,
    prompt:
      "Describe the right account lockout policies and rate limiting mechanism based on the product, if any.",
    category: "Authentication Authorization Concept",
    question:
      "Is there any sort of rate limiting or account lockout policies in place to prevent brute force attacks? Name any products used if available",
  },
  {
    question_id: 15,
    prompt:
      "Describe how should session tokens be handled and protected based on the product or technology. Describe what is the best practice for secure session management.",
    category: "Authentication Authorization Concept",
    question:
      "Does the system implement secure session management? Which product or technology is used? How are session tokens handled and protected? Name the technology",
  },
  {
    question_id: 16,
    prompt:
      "Describe the user roles and their permissions in best practice.",
    category: "Authentication Authorization Concept",
    question:
      "How does the application manage user roles and permissions? Name all planned user roles.",
  },
  {
    question_id: 17,
    prompt:
      "Describe how a secure password reset or account recovery looks like.",
    category: "Authentication Authorization Concept",
    question:
      "Does the application have a secure password reset or account recovery mechanism?",
  },
  {
    question_id: 18,
    prompt: "Describe the proper authentication this micro service",
    category: "Authentication Authorization Concept",
    question:
      "Does the web application use micro services and name the products used for the micro services.",
  },
  // Application Design
  {
    question_id: 19,
    prompt: "Improve the writing and  ",
    category: "Application Design",
    question:
      "Describe the main technology used for the application. Main framework, programming language, functions.",
  },
  {
    question_id: 20,
    prompt: "Describe the technology of the frontend and used products",
    category: "Application Design",
    question:
      "Figure out any known security weakness of the frontend technology and framework and describe the countermeasures. Consquestion_ider also OWASP top 10 for mobile app.",
  },
  {
    question_id: 21,
    prompt: "Describe the technology of the frontend and used products",
    category: "Application Design",
    question:
      "Figure out any known security weakness of the mquestion_iddleware technology and framework and describe the countermeasures. Consquestion_ider also OWASP top 10.",
  },
  {
    question_id: 22,
    prompt:
      "Figure out any known security weakness of the backend technology and framework and database, and describe the countermeasures. Consquestion_ider also OWASP top 10.",
    category: "Application Design",
    question: "Describe the backend layer or used database",
  },
  {
    question_id: 23,
    prompt: "Judge if it is a good architecture design.",
    category: "Application Design",
    question:
      "Describe the relation between frontend, mquestion_iddle layer or backend. If any layer is not available, just skip.",
  },
  {
    question_id: 24,
    prompt: "Improve the writing and  .",
    category: "Application Design",
    question: "Describe any library, dependencies used",
  },
  // Cloud Architecture
  {
    question_id: 25,
    prompt:
      "Describe the hardening measures for every of this cloud resource depending on the classification.",
    category: "Cloud Architecture",
    question:
      "Name all cloud resources used for this application such as VM, App service, container service, security groups, firewall, private link, database, application gateway, forward proxy, load balancer, security proxy, data storage,",
  },
  {
    question_id: 26,
    prompt:
      "Judge if this is a good cloud security architecture design. Recommend security best practices for this cloud settings.",
    category: "Cloud Architecture",
    question: "Describe the relation between all the cloud resources",
  },
  {
    question_id: 27,
    prompt:
      "Judge if the connection is secure consquestion_idering the classification. What is the preferred architecture?",
    category: "Cloud Architecture",
    question:
      "Describe if there are any connections between the cloud resources and company’s onprem environment",
  },
  {
    question_id: 28,
    prompt: "Judge if the access is secure regarding the classification.",
    category: "Cloud Architecture",
    question:
      "Describe how the user can access the web application, from the internet, from company’s intranet.",
  },
  {
    question_id: 29,
    prompt:
      "Judge if that is sufficient and mention that they should be connected to company’s central monitoring and SIEM solutions.",
    category: "Cloud Architecture",
    question: "Describe monitoring and evaluation services",
  },
  {
    question_id: 30,
    prompt:
      "Judge if the cloud governance model is sufficient and recommend improvements.",
    category: "Cloud Architecture",
    question: "Describe the current cloud governance model",
  },
];
