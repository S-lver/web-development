// Three.js Background Animation
const initThreeJS = () => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('threejs-background').appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x4a8fe7,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animated torus knot
    const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x4a8fe7,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const torusKnot = new THREE.Mesh(torusKnotGeometry, torusMaterial);
    torusKnot.position.z = -5;
    scene.add(torusKnot);

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        torusKnot.rotation.x += 0.005;
        torusKnot.rotation.y += 0.005;
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Skills Visualization
const initSkillsViz = () => {
    const skills = [
        { name: 'JavaScript', level: 70 },
        { name: 'React', level: 55 },
        { name: 'Node.js', level: 10 },
        { name: 'Three.js', level: 10 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Python', level: 70 },
        { name: 'SQL', level: 75 },
        { name: 'Git', level: 50 }
    ];

    const container = document.getElementById('skills-viz');
    
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        
        const skillName = document.createElement('span');
        skillName.className = 'skill-name';
        skillName.textContent = skill.name;
        
        const skillBar = document.createElement('div');
        skillBar.className = 'skill-bar';
        
        const skillLevel = document.createElement('div');
        skillLevel.className = 'skill-level';
        skillLevel.style.width = `${skill.level}%`;
        
        const skillPercent = document.createElement('span');
        skillPercent.className = 'skill-percent';
        skillPercent.textContent = `${skill.level}%`;
        
        skillBar.appendChild(skillLevel);
        skillElement.appendChild(skillName);
        skillElement.appendChild(skillBar);
        skillElement.appendChild(skillPercent);
        
        container.appendChild(skillElement);
    });
};

// Projects Data and Rendering
const initProjects = () => {
    const projects = [
        {
            title: 'Ai Fitness buddy',
            description: 'Your personal virtual fitness coach built with Flask and OpenAI/Groq—ready to generate workouts, motivate you with custom responses, and help track your health journey in real-time.',
            tags: ['Python', 'HTML'],
            link: 'https://github.com/S-lver/Flaskapp'
        },
        {
            title: 'Portfolio website',
            description: 'Website showcasing my work with three.js intergration',
            tags: ['HTML', 'CSS', 'Javascript','Three.js'],
            link: '#'
        },
        {
            title: 'AR Portfolio App',
            description: 'Mobile app showcasing my work with augmented reality features',
            tags: ['React Native', 'ARCore', 'Three.js'],
            link: '#'
        }
    ];

    const container = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const projectTitle = document.createElement('h3');
        projectTitle.className = 'project-title';
        projectTitle.textContent = project.title;
        
        const projectDesc = document.createElement('p');
        projectDesc.className = 'project-description';
        projectDesc.textContent = project.description;
        
        const projectTags = document.createElement('div');
        projectTags.className = 'project-tags';
        
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            projectTags.appendChild(tagElement);
        });
        
        const projectLink = document.createElement('a');
        projectLink.href = project.link;
        projectLink.className = 'project-link';
        projectLink.textContent = 'View Project →';
        
        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectDesc);
        projectCard.appendChild(projectTags);
        projectCard.appendChild(projectLink);
        
        container.appendChild(projectCard);
    });
};

// Smooth Scrolling
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
};

// Mobile Menu Toggle
const initMobileMenu = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
};

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initSkillsViz();
    initProjects();
    initSmoothScroll();
    initMobileMenu();
});