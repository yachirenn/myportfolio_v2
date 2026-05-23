import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Petal {
  mesh: THREE.Mesh
  velocity: THREE.Vector3
  rotationSpeed: THREE.Vector3
  life: number
  maxLife: number
  baseY: number
}

interface InkDrop {
  mesh: THREE.Mesh
  targetScale: number
  currentScale: number
  life: number
  maxLife: number
}

export default function ZenGarden() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ==================== SCENE SETUP ====================
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#F6F7ED')
    scene.fog = new THREE.Fog('#F6F7ED', 15, 45)

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.z = 18

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    // ==================== LIGHTING ====================
    // Soft ambient light (natural Japanese paper lantern feel)
    const ambientLight = new THREE.AmbientLight('#fff5e6', 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight('#ffe4c4', 0.8)
    directionalLight.position.set(5, 8, 5)
    scene.add(directionalLight)

    // ==================== WASHI PAPER GRID ====================
    const gridGroup = new THREE.Group()
    const gridSize = 35
    const spacing = 0.55
    const totalWidth = gridSize * spacing
    const startPos = -totalWidth / 2

    // Washi paper texture colors (cream, beige, soft brown)
    const washiColors = [
      new THREE.Color('#f5e6d3'), // Cream
      new THREE.Color('#ede0cc'), // Light beige
      new THREE.Color('#e8d5c0'), // Warm beige
      new THREE.Color('#f0e4d0'), // Soft cream
      new THREE.Color('#d4c4b0'), // Light brown
    ]

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const color = washiColors[Math.floor(Math.random() * washiColors.length)]
        const material = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.12 + Math.random() * 0.08,
        })

        // Use slightly randomized squares (like handmade washi paper)
        const size = 0.3 + Math.random() * 0.1
        const geometry = new THREE.BoxGeometry(size, size, 0.01)

        const dot = new THREE.Mesh(geometry, material)
        dot.position.x = startPos + i * spacing + (Math.random() - 0.5) * 0.1
        dot.position.y = startPos + j * spacing + (Math.random() - 0.5) * 0.1
        dot.position.z = -8 - Math.random() * 2
        dot.rotation.z = (Math.random() - 0.5) * 0.3

        gridGroup.add(dot)
      }
    }
    scene.add(gridGroup)

    // ==================== SAKURA PETALS ====================
    const petals: Petal[] = []
    const maxPetals = 25

    const createPetalTexture = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 32
      canvas.height = 32
      const ctx = canvas.getContext('2d')!
      
      // Draw sakura petal shape
      ctx.fillStyle = '#ffb7c5' // Sakura pink
      ctx.beginPath()
      ctx.moveTo(16, 4)
      ctx.bezierCurveTo(12, 8, 4, 12, 8, 20)
      ctx.bezierCurveTo(12, 18, 14, 16, 16, 20)
      ctx.bezierCurveTo(18, 16, 20, 18, 24, 20)
      ctx.bezierCurveTo(28, 12, 20, 8, 16, 4)
      ctx.fill()
      
      // Add subtle gradient
      const gradient = ctx.createRadialGradient(16, 12, 2, 16, 14, 14)
      gradient.addColorStop(0, '#ffd1dc')
      gradient.addColorStop(0.5, '#ffb7c5')
      gradient.addColorStop(1, '#ff8fa3')
      ctx.fillStyle = gradient
      ctx.fill()
      
      return new THREE.CanvasTexture(canvas)
    }

    const petalTexture = createPetalTexture()

    const createPetal = (): Petal => {
      const geometry = new THREE.PlaneGeometry(0.3, 0.5)
      const material = new THREE.MeshBasicMaterial({
        map: petalTexture,
        transparent: true,
        opacity: 0.7 + Math.random() * 0.3,
        side: THREE.DoubleSide,
        depthWrite: false,
      })

      const mesh = new THREE.Mesh(geometry, material)
      
      // Start from random position above screen
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        12 + Math.random() * 5,
        -3 - Math.random() * 5
      )
      
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      )

      scene.add(mesh)

      return {
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          -0.02 - Math.random() * 0.04,
          (Math.random() - 0.5) * 0.01
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.03
        ),
        life: 0,
        maxLife: 400 + Math.random() * 300,
        baseY: mesh.position.y,
      }
    }

    // Initialize petals
    for (let i = 0; i < maxPetals; i++) {
      const petal = createPetal()
      petal.life = Math.random() * petal.maxLife // Stagger
      petals.push(petal)
    }

    // ==================== INK DROPS (SUMI-E STYLE) ====================
    const inkDrops: InkDrop[] = []
    const maxInkDrops = 8

    const createInkDrop = (): InkDrop => {
      const geometry = new THREE.CircleGeometry(0.01, 16)
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#2c1810'),
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        depthWrite: false,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        -5 - Math.random() * 3
      )
      
      scene.add(mesh)

      return {
        mesh,
        targetScale: 0.5 + Math.random() * 1.5,
        currentScale: 0.01,
        life: 0,
        maxLife: 200 + Math.random() * 300,
      }
    }

    for (let i = 0; i < maxInkDrops; i++) {
      const drop = createInkDrop()
      drop.life = Math.floor(Math.random() * drop.maxLife)
      inkDrops.push(drop)
    }

    // ==================== INCENSE SMOKE PARTICLES ====================
    const smokeCount = 60
    const smokeGeometry = new THREE.BufferGeometry()
    const smokePositions = new Float32Array(smokeCount * 3)
    const smokeSizes = new Float32Array(smokeCount)
    const smokeData: { 
      baseX: number
      baseY: number
      life: number
      maxLife: number
      speed: number
    }[] = []

    for (let i = 0; i < smokeCount; i++) {
      const baseX = (Math.random() - 0.5) * 3
      const baseY = -5 + Math.random() * 2
      const baseZ = -6 - Math.random() * 2
      
      smokePositions[i * 3] = baseX
      smokePositions[i * 3 + 1] = baseY
      smokePositions[i * 3 + 2] = baseZ
      smokeSizes[i] = 0.3 + Math.random() * 0.7

      smokeData.push({
        baseX,
        baseY,
        life: Math.random() * 100,
        maxLife: 80 + Math.random() * 120,
        speed: 0.008 + Math.random() * 0.015,
      })
    }

    smokeGeometry.setAttribute('position', new THREE.BufferAttribute(smokePositions, 3))
    smokeGeometry.setAttribute('size', new THREE.BufferAttribute(smokeSizes, 1))

    const smokeMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#d4c4b0'),
      size: 0.2,
      transparent: true,
      opacity: 0.25,
      blending: THREE.NormalBlending,
      depthWrite: false,
    })

    const smoke = new THREE.Points(smokeGeometry, smokeMaterial)
    scene.add(smoke)

    // ==================== ENSO CIRCLE (ZEN CIRCLE) ====================
    const ensoGroup = new THREE.Group()
    
    // Create brushstroke-like circle using multiple overlapping rings
    for (let i = 0; i < 3; i++) {
      const radius = 7 + i * 0.3
      const points: THREE.Vector3[] = []
      const segments = 80
      
      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2
        const r = radius + Math.sin(j * 3) * 0.15 + Math.cos(j * 5) * 0.1
        points.push(new THREE.Vector3(
          Math.cos(angle) * r,
          Math.sin(angle) * r,
          -7
        ))
      }
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color('#2c1810'),
        transparent: true,
        opacity: 0.06 - i * 0.015,
        linewidth: 1,
      })
      
      const line = new THREE.Line(lineGeometry, lineMaterial)
      ensoGroup.add(line)
    }

    // Incomplete circle (wabi-sabi aesthetic)
    const ensoGeometry = new THREE.TorusGeometry(7.3, 0.04, 8, 80, Math.PI * 1.7)
    const ensoMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#2c1810'),
      transparent: true,
      opacity: 0.1,
    })
    const enso = new THREE.Mesh(ensoGeometry, ensoMaterial)
    enso.position.z = -7
    enso.rotation.z = Math.PI * 0.3
    ensoGroup.add(enso)

    scene.add(ensoGroup)

    // ==================== GOLDEN DUST PARTICLES ====================
    const dustCount = 40
    const dustGeometry = new THREE.BufferGeometry()
    const dustPositions = new Float32Array(dustCount * 3)
    const dustData: { baseY: number; speed: number; amplitude: number; phase: number }[] = []

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 16
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 10
      dustPositions[i * 3 + 2] = -5 - Math.random() * 4
      
      dustData.push({
        baseY: dustPositions[i * 3 + 1],
        speed: 0.003 + Math.random() * 0.008,
        amplitude: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
      })
    }

    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))

    const dustMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#c4a97d'),
      size: 0.06,
      transparent: true,
      opacity: 0.5,
      blending: THREE.NormalBlending,
      depthWrite: false,
    })

    const dust = new THREE.Points(dustGeometry, dustMaterial)
    scene.add(dust)

    // ==================== MOUSE HANDLER ====================
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = e.clientX / window.innerWidth
      targetMouseRef.current.y = 1 - e.clientY / window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)

    // ==================== RESIZE HANDLER ====================
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    // ==================== ANIMATION LOOP ====================
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse follow
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.02
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.02

      // Update sakura petals
      petals.forEach((petal) => {
        petal.life += 1

        // Swaying motion (wind effect)
        const swayX = Math.sin(elapsedTime * 0.5 + petal.mesh.position.y) * 0.01
        petal.mesh.position.x += petal.velocity.x + swayX
        petal.mesh.position.y += petal.velocity.y
        petal.mesh.position.z += petal.velocity.z

        // Rotation
        petal.mesh.rotation.x += petal.rotationSpeed.x
        petal.mesh.rotation.y += petal.rotationSpeed.y
        petal.mesh.rotation.z += petal.rotationSpeed.z

        // Mouse influence (gentle breeze toward cursor)
        const breezeX = (mouseRef.current.x - 0.5) * 0.005
        petal.mesh.position.x += breezeX

        // Fade near edges
        const material = petal.mesh.material as THREE.MeshBasicMaterial
        const edgeDistance = Math.abs(petal.mesh.position.x) / 12
        material.opacity = Math.max(0, 0.8 - edgeDistance * 0.3)

        // Reset if fallen below screen or life expired
        if (petal.mesh.position.y < -10 || petal.life >= petal.maxLife) {
          petal.mesh.position.set(
            (Math.random() - 0.5) * 20,
            12 + Math.random() * 3,
            -3 - Math.random() * 5
          )
          petal.life = 0
          petal.maxLife = 400 + Math.random() * 300
          const material = petal.mesh.material as THREE.MeshBasicMaterial
          material.opacity = 0.7 + Math.random() * 0.3
        }
      })

      // Update ink drops (pulsing)
      inkDrops.forEach((drop) => {
        drop.life += 1

        // Pulse scale
        drop.currentScale += (drop.targetScale - drop.currentScale) * 0.02
        drop.mesh.scale.setScalar(drop.currentScale)

        // Fade
        const lifeRatio = drop.life / drop.maxLife
        const material = drop.mesh.material as THREE.MeshBasicMaterial
        material.opacity = 0.15 * (1 - Math.abs(lifeRatio - 0.5) * 2)

        // Reset
        if (drop.life >= drop.maxLife) {
          drop.mesh.position.set(
            (Math.random() - 0.5) * 14,
            (Math.random() - 0.5) * 8,
            -5 - Math.random() * 3
          )
          drop.targetScale = 0.5 + Math.random() * 1.5
          drop.currentScale = 0.01
          drop.life = 0
          drop.maxLife = 200 + Math.random() * 300
        }
      })

      // Update incense smoke
      const smokePos = smokeGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < smokeCount; i++) {
        const data = smokeData[i]
        data.life += 1

        // Rise upward with swaying
        const progress = data.life / data.maxLife
        smokePos[i * 3] = data.baseX + Math.sin(elapsedTime * 0.8 + i) * 0.5
        smokePos[i * 3 + 1] = data.baseY + progress * 8
        smokePos[i * 3 + 2] = smokePos[i * 3 + 2] // Keep Z

        // Reset
        if (data.life >= data.maxLife) {
          data.life = 0
          smokePos[i * 3 + 1] = data.baseY
        }
      }
      smokeGeometry.attributes.position.needsUpdate = true

      // Update golden dust
      const dustPos = dustGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < dustCount; i++) {
        const data = dustData[i]
        dustPos[i * 3 + 1] = data.baseY + Math.sin(elapsedTime * data.speed + data.phase) * data.amplitude
        dustPos[i * 3] += Math.cos(elapsedTime * 0.3 + i) * 0.002
      }
      dustGeometry.attributes.position.needsUpdate = true

      // Gentle rotation of enso circle
      ensoGroup.rotation.z += 0.0003

      // Grid hover effect
      gridGroup.children.forEach((child) => {
        const mesh = child as THREE.Mesh
        const material = mesh.material as THREE.MeshBasicMaterial
        const worldPos = mesh.position.clone()
        const dx = worldPos.x / totalWidth - (mouseRef.current.x - 0.5) * 2
        const dy = worldPos.y / totalWidth - (mouseRef.current.y - 0.5) * 2
        const distance = Math.sqrt(dx * dx + dy * dy)

        const influence = Math.max(0, 1 - distance / 0.7)
        material.opacity = 0.1 + influence * 0.3
      })

      // Camera gentle sway
      camera.position.x += (mouseRef.current.x * 1.5 - 0.75 - camera.position.x) * 0.015
      camera.position.y += (-mouseRef.current.y * 1.2 + 0.6 - camera.position.y) * 0.015
      camera.lookAt(0, 0, -4)

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // ==================== CLEANUP ====================
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      container.removeChild(renderer.domElement)

      // Dispose all
      petals.forEach(p => {
        p.mesh.geometry.dispose()
        ;(p.mesh.material as THREE.MeshBasicMaterial).dispose()
      })
      inkDrops.forEach(d => {
        d.mesh.geometry.dispose()
        ;(d.mesh.material as THREE.MeshBasicMaterial).dispose()
      })
      smokeGeometry.dispose()
      smokeMaterial.dispose()
      dustGeometry.dispose()
      dustMaterial.dispose()
      
      gridGroup.children.forEach(c => {
        const m = c as THREE.Mesh
        m.geometry.dispose()
        ;(m.material as THREE.MeshBasicMaterial).dispose()
      })

      ensoGroup.children.forEach(c => {
        if (c instanceof THREE.Mesh) {
          c.geometry.dispose()
          ;(c.material as THREE.MeshBasicMaterial).dispose()
        } else if (c instanceof THREE.Line) {
          c.geometry.dispose()
          ;(c.material as THREE.LineBasicMaterial).dispose()
        }
      })

      petalTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-1" 
    />
  )
}