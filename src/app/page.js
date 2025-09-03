"use client";
import React, { useRef, useState, useEffect } from "react";

export default function Home() {
	const [text, setText] = useState("");
	const blur = 1.5;
	const canvasRef = useRef(null);

	const handleDownload = () => {
		const canvas = canvasRef.current;
		const link = document.createElement("a");
		link.download = "anomali-sticker.png";
		link.href = canvas.toDataURL("image/png");
		link.click();
	};

	const drawSticker = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.filter = `blur(${blur}px)`;
		ctx.textAlign = "left";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#222";

		// Font size relative to text length and square size
		const maxWidth = canvas.width * 0.85;
		const maxHeight = canvas.height * 0.85;
		let fontSize = Math.max(48 - Math.floor(text.length / 2), 16);
		let lines = [];

		// Natural text wrapping: add words to a line until it overflows horizontally, then move to next line
		let words = text.split(/\s+/).filter(Boolean);
		function wrapText(fontSize) {
			ctx.font = `bold ${fontSize}px Arial, sans-serif`;
			let lines = [];
			let line = "";
			for (let i = 0; i < words.length; i++) {
				let testLine = line ? line + " " + words[i] : words[i];
				let metrics = ctx.measureText(testLine);
				if (metrics.width > maxWidth && line) {
					lines.push(line);
					line = words[i];
				} else {
					line = testLine;
				}
			}
			if (line) lines.push(line);
			return lines.length ? lines : [""];
		}

		// Reduce font size until all lines fit vertically
		while (true) {
			let testLines = wrapText(fontSize);
			let totalHeight = testLines.length * fontSize * 1.2;
			if (totalHeight <= maxHeight || fontSize <= 16) {
				lines = testLines;
				break;
			}
			fontSize -= 2;
		}

		ctx.font = `bold ${fontSize}px Arial, sans-serif`;
		let startY =
			canvas.height / 2 - ((lines.length - 1) * fontSize * 1.2) / 2;
		let startX = canvas.width * 0.075;
		for (let i = 0; i < lines.length; i++) {
			ctx.fillText(lines[i], startX, startY + i * fontSize * 1.2);
		}
		ctx.restore();
	};

	useEffect(() => {
		drawSticker();
	}, [text, blur]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-10">
			<div className="max-w-md w-full bg-white/80 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-8">
				<h1 className="text-3xl font-extrabold text-center text-green-700 tracking-tight mb-2">
					AnomaliMaker
				</h1>
				<p className="text-gray-700 text-center mb-4">
					Create WhatsApp-style anomaly stickers with realistic blur
					effects.
				</p>
				<canvas
					ref={canvasRef}
					width={320}
					height={320}
					className="rounded-xl border-2 border-green-400 shadow-lg bg-transparent mb-4"
				/>
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Type your message..."
					className="w-full px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg mb-2"
				/>

				<button
					onClick={handleDownload}
					className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition">
					Download as PNG
				</button>
				<div className="text-xs text-gray-500 text-center mt-2">
					Sticker is ready for WhatsApp import. <br />
					<span className="font-semibold">Tip:</span> Use any sticker
					import app.
				</div>
			</div>
			<footer className="mt-10 text-gray-400 text-xs text-center">
				&copy; {new Date().getFullYear()} AnomaliMaker
			</footer>
		</div>
	);
}
