import * as THREE from "three";
import { SECTION_COUNT } from "@/lib/depthStore";

/** Deterministic RNG so the network is identical every visit. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CLUSTER_SPACING = 14;
const FIRST_CLUSTER_Z = 26;

export interface NetworkData {
  clusterCenters: THREE.Vector3[];
  /** violet node transforms */
  nodes: { position: THREE.Vector3; scale: number }[];
  /** gold (signal) node transforms */
  goldNodes: { position: THREE.Vector3; scale: number; phase: number }[];
  /** flat [ax,ay,az,bx,by,bz, ...] for LineSegments */
  edgePositions: Float32Array;
  /** edge endpoints for pulse travel */
  edges: { a: THREE.Vector3; b: THREE.Vector3 }[];
}

export function clusterZ(index: number): number {
  return FIRST_CLUSTER_Z - CLUSTER_SPACING * index;
}

export function clusterCenter(index: number): THREE.Vector3 {
  // Lateral drift gives the camera path a serpentine, cinematic line.
  const x = Math.sin(index * 1.7) * 3.2;
  const y = Math.cos(index * 1.3) * 1.6;
  return new THREE.Vector3(x, y, clusterZ(index));
}

export function generateNetwork(lowPower: boolean): NetworkData {
  const rand = mulberry32(20260610);
  const gauss = () => (rand() + rand() + rand() - 1.5) * 0.8;

  const clusterCenters: THREE.Vector3[] = [];
  for (let i = 0; i < SECTION_COUNT; i++) clusterCenters.push(clusterCenter(i));

  const nodesPerCluster = lowPower ? 14 : 26;
  const interstitialCount = lowPower ? 24 : 60;

  const nodes: NetworkData["nodes"] = [];
  const goldNodes: NetworkData["goldNodes"] = [];
  const all: THREE.Vector3[] = [];

  const addNode = (p: THREE.Vector3) => {
    all.push(p);
    if (rand() < 0.16) {
      goldNodes.push({ position: p, scale: 0.055 + rand() * 0.05, phase: rand() * Math.PI * 2 });
    } else {
      nodes.push({ position: p, scale: 0.03 + rand() * 0.065 });
    }
  };

  for (const c of clusterCenters) {
    for (let n = 0; n < nodesPerCluster; n++) {
      addNode(new THREE.Vector3(c.x + gauss() * 6.5, c.y + gauss() * 4.0, c.z + gauss() * 4.5));
    }
  }

  const zMin = clusterZ(SECTION_COUNT - 1) - 8;
  const zMax = FIRST_CLUSTER_Z + 10;
  for (let n = 0; n < interstitialCount; n++) {
    addNode(
      new THREE.Vector3((rand() - 0.5) * 30, (rand() - 0.5) * 18, zMin + rand() * (zMax - zMin))
    );
  }

  // Connect each node to its nearest neighbours within reach.
  const edges: NetworkData["edges"] = [];
  const maxDist = 5.2;
  const maxLinks = 3;
  for (let i = 0; i < all.length; i++) {
    const dists: { j: number; d: number }[] = [];
    for (let j = i + 1; j < all.length; j++) {
      const d = all[i].distanceTo(all[j]);
      if (d < maxDist) dists.push({ j, d });
    }
    dists.sort((p, q) => p.d - q.d);
    for (const { j } of dists.slice(0, maxLinks)) {
      edges.push({ a: all[i], b: all[j] });
    }
  }

  // Long spine connections threading clusters together along the journey.
  for (let i = 0; i < clusterCenters.length - 1; i++) {
    const near = (c: THREE.Vector3) =>
      all.reduce((best, p) => (p.distanceTo(c) < best.distanceTo(c) ? p : best), all[0]);
    edges.push({ a: near(clusterCenters[i]), b: near(clusterCenters[i + 1]) });
  }

  const edgePositions = new Float32Array(edges.length * 6);
  edges.forEach((e, i) => {
    edgePositions.set([e.a.x, e.a.y, e.a.z, e.b.x, e.b.y, e.b.z], i * 6);
  });

  return { clusterCenters, nodes, goldNodes, edgePositions, edges };
}
