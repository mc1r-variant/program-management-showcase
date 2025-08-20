// Project data storage
let projectData = {};
let communicationPlan = {};

// Navigation functions
function goToStep2() {
    // Validate step 1
    const projectName = document.getElementById('projectName').value.trim();
    const projectType = document.getElementById('projectType').value;
    const projectPhase = document.getElementById('projectPhase').value;
    const projectDuration = document.getElementById('projectDuration').value;
    const impactLevel = document.getElementById('impactLevel').value;

    if (!projectName || !projectType || !projectPhase || !projectDuration || !impactLevel) {
        alert('Please fill in all required fields before proceeding.');
        return;
    }

    // Store step 1 data
    projectData = {
        name: projectName,
        type: projectType,
        phase: projectPhase,
        duration: projectDuration,
        impact: impactLevel
    };

    // Navigate to step 2
    document.getElementById('step1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
}

function goToStep1() {
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
}

function startOver() {
    // Clear data
    projectData = {};
    communicationPlan = {};
    
    // Reset form
    document.querySelector('form') && document.querySelector('form').reset();
    
    // Clear checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    // Show step 1
    document.getElementById('resultsContainer').classList.add('hidden');
    document.getElementById('formContainer').classList.remove('hidden');
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step1').classList.remove('hidden');
}

function generatePlan() {
    // Validate step 2
    const selectedStakeholders = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);
    const commFrequency = document.getElementById('commFrequency').value;

    if (selectedStakeholders.length === 0 || !commFrequency) {
        alert('Please select at least one stakeholder group and communication frequency.');
        return;
    }

    // Store step 2 data
    projectData.stakeholders = selectedStakeholders;
    projectData.frequency = commFrequency;

    // Generate the communication plan
    communicationPlan = generateCommunicationPlan(projectData);

    // Display results
    displayResults();
}

function generateCommunicationPlan(data) {
    return {
        stakeholderMatrix: createStakeholderMatrix(data),
        messageTemplates: createMessageTemplates(data),
        escalationPaths: createEscalationPaths(),
        successMetrics: createSuccessMetrics()
    };
}

function createStakeholderMatrix(data) {
    return data.stakeholders.map(stakeholder => {
        let engagement = 'Medium';
        let detailLevel = 'Summary';
        let frequency = 'Weekly';
        
        // Customize based on stakeholder type and project characteristics
        if (stakeholder.includes('Executive') || stakeholder.includes('C-Suite')) {
            engagement = 'High';
            detailLevel = 'Executive Summary';
            frequency = data.impact.includes('High') ? 'Weekly' : 'Bi-weekly';
        } else if (stakeholder.includes('End Users') || stakeholder.includes('Employees')) {
            engagement = data.impact.includes('High') ? 'High' : 'Medium';
            detailLevel = 'Detailed';
            frequency = 'Weekly';
        } else if (stakeholder.includes('Project Team')) {
            engagement = 'High';
            detailLevel = 'Detailed';
            frequency = 'Daily';
        } else if (stakeholder.includes('IT') || stakeholder.includes('Technical')) {
            engagement = 'High';
            detailLevel = 'Technical';
            frequency = 'Weekly';
        }
        
        return {
            group: stakeholder,
            engagement,
            detailLevel,
            frequency,
            primaryConcerns: getPrimaryConcerns(stakeholder)
        };
    });
}

function getPrimaryConcerns(stakeholder) {
    const concernMap = {
        'Executive Leadership/C-Suite': ['Budget impact', 'Timeline adherence', 'Strategic alignment', 'Risk mitigation'],
        'Department Heads/Directors': ['Team impact', 'Resource allocation', 'Performance metrics', 'Change management'],
        'Project Team Members': ['Task clarity', 'Dependencies', 'Resource availability', 'Timeline pressure'],
        'End Users/Employees': ['Job impact', 'Training needs', 'Support availability', 'Process changes'],
        'IT/Technical Teams': ['Technical requirements', 'System integration', 'Security implications', 'Maintenance needs'],
        'Legal/Compliance': ['Regulatory compliance', 'Risk assessment', 'Policy alignment', 'Documentation'],
        'HR/People Operations': ['Employee impact', 'Training coordination', 'Policy updates', 'Change resistance'],
        'External Vendors/Partners': ['Contract implications', 'Integration requirements', 'Timeline coordination', 'Deliverable expectations'],
        'Customer Support': ['Customer impact', 'Support process changes', 'Training requirements', 'FAQ updates'],
        'Marketing/Communications': ['Messaging consistency', 'Customer communication', 'Brand impact', 'Timeline coordination']
    };
    
    return concernMap[stakeholder] || ['Project impact', 'Timeline updates', 'Resource needs', 'Success metrics'];
}

function createMessageTemplates(data) {
    return {
        executiveBrief: {
            subject: `${data.name} - Executive Brief`,
            template: `📊 PROJECT STATUS: [Green/Yellow/Red]

🎯 KEY HIGHLIGHTS:
• [Major milestone or achievement]
• [Progress metric]
• [Important decision made]

⚠️ ATTENTION NEEDED:
• [Any executive decisions required]
• [Resource requests]
• [Risk escalations]

📈 METRICS:
• Timeline: [X% complete, on/behind schedule]
• Budget: [X% utilized]
• Quality: [Key quality metrics]

🔮 NEXT 30 DAYS:
• [Key milestone]
• [Major deliverable]
• [Important meeting/decision]

---
Full details available in project dashboard.`
        },
        
        teamUpdate: {
            subject: `${data.name} - Team Update`,
            template: `Hi Team,

🎯 THIS WEEK'S FOCUS:
• [Priority 1]
• [Priority 2]
• [Priority 3]

✅ COMPLETED:
• [Achievement 1]
• [Achievement 2]

🚧 IN PROGRESS:
• [Work item 1] - [Owner]
• [Work item 2] - [Owner]

🔴 BLOCKERS:
• [Blocker] - [Action needed]

📅 UPCOMING:
• [Date]: [Milestone/meeting]
• [Date]: [Deliverable due]

❓ QUESTIONS/SUPPORT NEEDED:
Reply if you need help with anything!

Thanks,
[Your name]`
        },
        
        endUserAnnouncement: {
            subject: `Important Update: ${data.name}`,
            template: `Dear Team,

We want to keep you informed about ${data.name} and how it affects you.

🔍 WHAT'S HAPPENING:
[Brief, non-technical explanation of the project]

📅 TIMELINE:
• [Key date]: [What happens]
• [Key date]: [What happens]

💼 IMPACT ON YOU:
• [Specific change 1]
• [Specific change 2]
• [What stays the same]

📚 GETTING READY:
• Training: [When and how]
• Support: [Who to contact]
• Resources: [Where to find help]

❓ QUESTIONS?
[Contact information]

We'll continue to keep you updated as we progress.

Best regards,
[Project team]`
        }
    };
}

function createEscalationPaths() {
    return {
        levels: [
            {
                level: 'Level 1 - Project Team',
                timeframe: 'Immediate',
                issues: ['Day-to-day blockers', 'Resource conflicts', 'Technical issues'],
                contacts: ['Project Manager', 'Tech Lead', 'Team Leads']
            },
            {
                level: 'Level 2 - Management',
                timeframe: '24-48 hours',
                issues: ['Budget concerns', 'Resource allocation', 'Timeline risks'],
                contacts: ['Department Head', 'Sponsor', 'Program Manager']
            },
            {
                level: 'Level 3 - Executive',
                timeframe: '1-3 days',
                issues: ['Strategic misalignment', 'Major budget overruns', 'Critical timeline slips'],
                contacts: ['Executive Sponsor', 'C-Suite', 'Steering Committee']
            }
        ]
    };
}

function createSuccessMetrics() {
    return {
        communicationMetrics: [
            'Email open rates >70%',
            'Meeting attendance >80%',
            'Stakeholder survey scores >4/5',
            'Response time to questions <24 hours',
            'Escalation resolution time <48 hours'
        ],
        
        projectMetrics: [
            'On-time delivery (within 5% of timeline)',
            'Budget adherence (within 10% of approved)',
            'User adoption rate >85% within 30 days',
            'Stakeholder satisfaction >4/5',
            'Post-launch issues <5% of user base'
        ]
    };
}

function displayResults() {
    // Hide form, show results
    document.getElementById('formContainer').classList.add('hidden');
    document.getElementById('resultsContainer').classList.remove('hidden');

    const resultsContent = document.getElementById('resultsContent');
    
    resultsContent.innerHTML = `
        <div class="result-section">
            <h3>📋 Project Overview</h3>
            <div class="project-overview">
                <div class="overview-item"><strong>Project:</strong> ${projectData.name}</div>
                <div class="overview-item"><strong>Type:</strong> ${projectData.type}</div>
                <div class="overview-item"><strong>Phase:</strong> ${projectData.phase}</div>
                <div class="overview-item"><strong>Duration:</strong> ${projectData.duration}</div>
                <div class="overview-item"><strong>Impact:</strong> ${projectData.impact}</div>
            </div>
        </div>

        <div class="result-section">
            <h3>👥 Stakeholder Matrix</h3>
            <div class="table-container">
                <table class="stakeholder-table">
                    <thead>
                        <tr>
                            <th>Stakeholder Group</th>
                            <th>Engagement</th>
                            <th>Detail Level</th>
                            <th>Frequency</th>
                            <th>Primary Concerns</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${communicationPlan.stakeholderMatrix.map(stakeholder => `
                            <tr>
                                <td>${stakeholder.group}</td>
                                <td><span class="engagement-${stakeholder.engagement.toLowerCase()}">${stakeholder.engagement}</span></td>
                                <td>${stakeholder.detailLevel}</td>
                                <td>${stakeholder.frequency}</td>
                                <td>${stakeholder.primaryConcerns.join(', ')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="result-section">
            <h3>📝 Message Templates</h3>
            
            <div class="template-section">
                <h4>Executive Brief Template</h4>
                <div class="template-box">
                    <div class="template-header">Subject: ${communicationPlan.messageTemplates.executiveBrief.subject}</div>
                    <pre class="template-content">${communicationPlan.messageTemplates.executiveBrief.template}</pre>
                </div>
            </div>

            <div class="template-section">
                <h4>Team Update Template</h4>
                <div class="template-box">
                    <div class="template-header">Subject: ${communicationPlan.messageTemplates.teamUpdate.subject}</div>
                    <pre class="template-content">${communicationPlan.messageTemplates.teamUpdate.template}</pre>
                </div>
            </div>

            <div class="template-section">
                <h4>End User Announcement Template</h4>
                <div class="template-box">
                    <div class="template-header">Subject: ${communicationPlan.messageTemplates.endUserAnnouncement.subject}</div>
                    <pre class="template-content">${communicationPlan.messageTemplates.endUserAnnouncement.template}</pre>
                </div>
            </div>
        </div>

        <div class="result-section">
            <h3>🚨 Escalation Paths</h3>
            <div class="escalation-levels">
                ${communicationPlan.escalationPaths.levels.map(level => `
                    <div class="escalation-level">
                        <h4>${level.level} <span class="timeframe">(${level.timeframe})</span></h4>
                        <div class="escalation-details">
                            <div><strong>Issues:</strong> ${level.issues.join(', ')}</div>
                            <div><strong>Contacts:</strong> ${level.contacts.join(', ')}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="result-section">
            <h3>📊 Success Metrics</h3>
            <div class="metrics-container">
                <div class="metrics-column">
                    <h4>Communication Metrics</h4>
                    <ul>
                        ${communicationPlan.successMetrics.communicationMetrics.map(metric => `<li>${metric}</li>`).join('')}
                    </ul>
                </div>
                <div class="metrics-column">
                    <h4>Project Metrics</h4>
                    <ul>
                        ${communicationPlan.successMetrics.projectMetrics.map(metric => `<li>${metric}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function downloadPlan() {
    const markdownContent = generateMarkdownReport();
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectData.name.replace(/\s+/g, '_').toLowerCase()}_communication_plan.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateMarkdownReport() {
    return `# ${projectData.name} - Communication Plan

## Project Overview
- **Project Type:** ${projectData.type}
- **Current Phase:** ${projectData.phase}
- **Duration:** ${projectData.duration}
- **Impact Level:** ${projectData.impact}

## Stakeholder Matrix

| Stakeholder Group | Engagement Level | Detail Level | Frequency | Primary Concerns |
|------------------|------------------|--------------|-----------|------------------|
${communicationPlan.stakeholderMatrix.map(s => 
  `| ${s.group} | ${s.engagement} | ${s.detailLevel} | ${s.frequency} | ${s.primaryConcerns.join(', ')} |`
).join('\n')}

## Message Templates

### Executive Brief
**Subject:** ${communicationPlan.messageTemplates.executiveBrief.subject}

\`\`\`
${communicationPlan.messageTemplates.executiveBrief.template}
\`\`\`

### Team Update
**Subject:** ${communicationPlan.messageTemplates.teamUpdate.subject}

\`\`\`
${communicationPlan.messageTemplates.teamUpdate.template}
\`\`\`

### End User Announcement
**Subject:** ${communicationPlan.messageTemplates.endUserAnnouncement.subject}

\`\`\`
${communicationPlan.messageTemplates.endUserAnnouncement.template}
\`\`\`

## Escalation Paths

${communicationPlan.escalationPaths.levels.map(level => `
### ${level.level}
- **Timeframe:** ${level.timeframe}
- **Issues:** ${level.issues.join(', ')}
- **Contacts:** ${level.contacts.join(', ')}
`).join('\n')}

## Success Metrics

### Communication Metrics
${communicationPlan.successMetrics.communicationMetrics.map(m => `- ${m}`).join('\n')}

### Project Metrics
${communicationPlan.successMetrics.projectMetrics.map(m => `- ${m}`).join('\n')}

---
*Generated by Stakeholder Communication Generator*
*Part of the Program Management Showcase*
`;
}
