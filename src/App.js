import { useState, useRef, useEffect } from 'react';
import * as Text from './text.js';
import styles from './App.module.css';

export function App() {
	const [p2IsIntersecting, setp2IsIntersecting] = useState(false);
	const [p3IsIntersecting, setp3IsIntersecting] = useState(false);

	const p2 = useRef(null);
	const p3 = useRef(null);

	useEffect(() => {
		const p2Observer = new IntersectionObserver(
			([entry]) => {
				setp2IsIntersecting(entry.isIntersecting);
			},
			{
				threshold: 0.2,
			}
		);
		const p3Observer = new IntersectionObserver(
			([entry]) => {
				setp3IsIntersecting(entry.isIntersecting);
			},
			{
				threshold: 0.2,
			}
		);
		p2Observer.observe(p2.current);
		p3Observer.observe(p3.current);
		return () => p2Observer.disconnect();
	}, []);

	useEffect(() => {
		if (p2IsIntersecting) {
			p2.current.querySelectorAll('h1').forEach((el) => {
				el.classList.add(styles.moveUpAnimation);
			});
			p2.current.querySelectorAll('h3').forEach((el) => {
				el.classList.add(styles.p2FadeIn);
			});
			p2.current.querySelectorAll('hr').forEach((el) => {
				el.classList.add(styles.p2FadeIn);
			});
			p2.current.querySelectorAll('p').forEach((el) => {
				el.classList.add(styles.p2FadeIn);
			});
		}
	}, [p2IsIntersecting]);

	useEffect(() => {
		if (p3IsIntersecting) {
			p3.current.querySelectorAll('p').forEach((el) => {
				el.classList.add(styles.p3FadeIn);
			});
		}
	}, [p3IsIntersecting]);

	return (
		<div className={styles.container}>
			<div className={styles.landingSpacer}></div>
			<span className={`${styles.letters} ${styles.firstName}`}>
				<h1 id={styles.a}>A</h1>
				<h1 id={styles.l}>l</h1>
				<h1 id={styles.v}>v</h1>
				<h1 id={styles.i}>i</h1>
				<h1 id={styles.n}>n</h1>
			</span>
			<span className={`${styles.letters} ${styles.lastName}`}>
				<h1 id={styles.x}>X</h1>
				<h1 id={styles.u}>u</h1>
			</span>
			<div className={styles.hiThere} ref={p2}>
				<h1>{Text.landing}</h1>
				<h3>{Text.experience}</h3>
				<hr></hr>
				<p>{Text.mostRecently}</p>
				<p>{Text.firstMilestone}</p>
			</div>
			<div className={`${styles.hiThere} ${styles.p3}`} ref={p3}>
				<p>{Text.secondMilestone}</p>
				<p>{Text.furthermore}</p>
				<p>{Text.vclExperience}</p>
			</div>
			<div className={styles.linksContainer}>
				<h1>Links</h1>
				<ul>
					<li>
						<a
							href="https://github.com/ax920"
							className={styles.textHoverUnderline}
						>
							Github
						</a>
					</li>
					<li>
						<a
							href="https://linkedin.com/in/ax920/"
							className={styles.textHoverUnderline}
						>
							LinkedIn
						</a>
					</li>
					<li>
						<a
							href="alvin_xu_resume.pdf"
							download="alvin-resume.pdf"
							className={styles.textHoverUnderline}
						>
							Resume
						</a>
					</li>
					<li>
						<a
							href="https://vs.co/83td9o9m"
							className={styles.textHoverUnderline}
						>
							Photography
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
