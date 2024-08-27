export const Questions = [
  // General Information
  {
    id: 1,
    prompt_help: "Correct the capitalization of the name of application",
    category: "General Information",
    question: "Name of application",
  },
  {
    id: 2,
    prompt_help: "Correct the capitalization of the name of the contact person",
    category: "General Information",
    question: "Contact person",
  },
  {
    id: 3,
    prompt_help: "Improve writing",
    category: "General Information",
    question:
      "Describe the main business purposes of the application. Companies or consumers in scope",
  },
  {
    id: 4,
    prompt_help:
      "Depending on regions there must be specific requirements. E.g. in EU follow GDPR, data should not be hosted outside of EU. In other countries less restrictions. In China and Russia data must be kept inside the same country. Add this information into the prompt and let GPT generate the controls.",
    category: "General Information",
    question:
      "Describe the main business purposes of the application. Companies or consumers in scope",
  },
  {
    id: 5,
    prompt_help:
      "Extract the information and use them across the entire prompting. E.g. this is a confidential application (public, internal, confidential, secret). Based on this classification recommend the corresponding controls.",
    category: "General Information",
    question:
      "Describe the level of confidentiality, integrity and availability. Examples for confidentiality: public, internal, confidential, secret. Example for availabilty: standard or critical. Example for integrity: standard or critical. If the app includes personal sensitive data such as credit card number, motion data, sexual preference etc.? All can be can also be implemented as check boxes.",
  },
  {
    id: 6,
    prompt_help: "Personal sensitive data -> strict controls",
    category: "General Information",
    question:
      "Kind of application: SaaS, completely Self developed, or individual coding based on existing products",
  },
  {
    id: 7,
    prompt_help:
      " Ask if any industry specific security requirements are necessary.",
    category: "General Information",
    question:
      "Industry of the application (Example: automotive, health, public sector, financial, consumer, telecom, machinery, chemistry, service, consulting, education)",
  },
  {
    id: 8,
    prompt_help:
      "In case of SaaS the certification must be related to the SaaS software. In other cases the certification is related to the (cloud) hosting environment. Judge if the certification is available or not, and if it is sufficient.",
    category: "General Information",
    question: "Any certification available (e.g. SOC2 type2, ISO27001 etc.).",
  },
  // Authentication Authorization Concept
  {
    id: 9,
    prompt_help:
      "Say that company authorized SSO should always be preferred over the built-in authentication of the application. Only in the case of few users, it makes no sense to integrate SSO since it causes too much efforts",
    category: "Authentication Authorization Concept",
    question:
      "Do you use a company wide SSO system or a built-in authentication of the application?",
  },
  {
    id: 10,
    prompt_help: "Describe the company’s password policy, MFA etc.",
    category: "Authentication Authorization Concept",
    question:
      "What authentication mechanism is being used for the web application? Is it based on passwords, multi-factor authentication, or some other method?",
  },
  {
    id: 11,
    prompt_help:
      "Describe a secure account creation and management process. Describe how to prevent unauthorized account creation or modification.",
    category: "Authentication Authorization Concept",
    question: "Is account creation and management secure?",
  },
  {
    id: 12,
    prompt_help:
      "Based on the described technology, describe best practice according",
    category: "Authentication Authorization Concept",
    question:
      "What authorization mechanism is being used for the web application? Describe technology.",
  },
  {
    id: 13,
    prompt_help:
      "Describe which function should be used based on the given programming language and framework. Mention hash and salt.",
    category: "Authentication Authorization Concept",
    question:
      "Where are user credentials stored? Which programming language or framework is used.",
  },
  {
    id: 14,
    prompt_help:
      "Describe the right account lockout policies and rate limiting mechanism based on the product, if any.",
    category: "Authentication Authorization Concept",
    question:
      "Is there any sort of rate limiting or account lockout policies in place to prevent brute force attacks? Name any products used if available",
  },
  {
    id: 15,
    prompt_help:
      "Describe how should session tokens be handled and protected based on the product or technology. Describe what is the best practice for secure session management.",
    category: "Authentication Authorization Concept",
    question:
      "Does the system implement secure session management? Which product or technology is used? How are session tokens handled and protected? Name the technology",
  },
  {
    id: 16,
    prompt_help:
      "Describe the user roles and their permissions in best practice.",
    category: "Authentication Authorization Concept",
    question:
      "How does the application manage user roles and permissions? Name all planned user roles.",
  },
  {
    id: 17,
    prompt_help:
      "Describe how a secure password reset or account recovery looks like.",
    category: "Authentication Authorization Concept",
    question:
      "Does the application have a secure password reset or account recovery mechanism?",
  },
  {
    id: 18,
    prompt_help: "Describe the proper authentication this micro service",
    category: "Authentication Authorization Concept",
    question:
      "Does the web application use micro services and name the products used for the micro services.",
  },
  // Application Design
  {
    id: 19,
    prompt_help: "Improve the writing and  ",
    category: "Application Design",
    question:
      "Describe the main technology used for the application. Main framework, programming language, functions.",
  },
  {
    id: 20,
    prompt_help: "Describe the technology of the frontend and used products",
    category: "Application Design",
    question:
      "Figure out any known security weakness of the frontend technology and framework and describe the countermeasures. Consider also OWASP top 10 for mobile app.",
  },
  {
    id: 21,
    prompt_help: "Describe the technology of the frontend and used products",
    category: "Application Design",
    question:
      "Figure out any known security weakness of the middleware technology and framework and describe the countermeasures. Consider also OWASP top 10.",
  },
  {
    id: 22,
    prompt_help:
      "Figure out any known security weakness of the backend technology and framework and database, and describe the countermeasures. Consider also OWASP top 10.",
    category: "Application Design",
    question: "Describe the backend layer or used database",
  },
  {
    id: 23,
    prompt_help: "Judge if it is a good architecture design.",
    category: "Application Design",
    question:
      "Describe the relation between frontend, middle layer or backend. If any layer is not available, just skip.",
  },
  {
    id: 24,
    prompt_help: "Improve the writing and  .",
    category: "Application Design",
    question: "Describe any library, dependencies used",
  },
  // Cloud Architecture
  {
    id: 25,
    prompt_help:
      "Describe the hardening measures for every of this cloud resource depending on the classification.",
    category: "Cloud Architecture",
    question:
      "Name all cloud resources used for this application such as VM, App service, container service, security groups, firewall, private link, database, application gateway, forward proxy, load balancer, security proxy, data storage,",
  },
  {
    id: 26,
    prompt_help:
      "Judge if this is a good cloud security architecture design. Recommend security best practices for this cloud settings.",
    category: "Cloud Architecture",
    question: "Describe the relation between all the cloud resources",
  },
  {
    id: 27,
    prompt_help:
      "Judge if the connection is secure considering the classification. What is the preferred architecture?",
    category: "Cloud Architecture",
    question:
      "Describe if there are any connections between the cloud resources and company’s onprem environment",
  },
  {
    id: 28,
    prompt_help: "Judge if the access is secure regarding the classification.",
    category: "Cloud Architecture",
    question:
      "Describe how the user can access the web application, from the internet, from company’s intranet.",
  },
  {
    id: 29,
    prompt_help:
      "Judge if that is sufficient and mention that they should be connected to company’s central monitoring and SIEM solutions.",
    category: "Cloud Architecture",
    question: "Describe monitoring and evaluation services",
  },
  {
    id: 30,
    prompt_help:
      "Judge if the cloud governance model is sufficient and recommend improvements.",
    category: "Cloud Architecture",
    question: "Describe the current cloud governance model",
  },
];
