import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vision',
  // standalone: true,
  // imports: [],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.css',
})
export class VisionComponent implements OnInit {
  visionStatement: string= '';
  missionStatement: string= '';
  history: string= '';
  team: string= '';
  achievements: string= '';
  testimonials: string= '';
  socialResponsibility: string = '';
  achievements1: string  = '';

  constructor() { }

  ngOnInit(): void {
    // Assign values to the variables from your backend or local data
    this.visionStatement = "To operate as a center of excellence, leveraging our expertise in asset management and innovation to deliver unparalleled solutions for our clients. Through a dedication to merging business strategies with state-of-the-art technology, we aim to unlock our full potential and consistently exceed expectations, driving success and value for our clients. ";
    this.missionStatement = "To be recognized as the foremost provider of innovative solutions, setting the standard for excellence in asset-centric industries. We envision a future where our seamless integration of business strategy and cutting-edge technology continues to drive transformative outcomes, empowering our clients to achieve their goals with unparalleled efficiency and success. ";
    this.history = "The firm was founded by William Welch Deloitte in London, England in 1845 and expanded into the United States in 1890. It merged with Haskins & Sells to form Deloitte Haskins & Sells in 1972 and with Touche Ross in the US to form Deloitte & Touche in 1989.";
    this.achievements = "In 2019, Fortune magazine ranked Deloitte as one of the 100 Best Companies to Work For; and Bloomberg Business has consistently named Deloitte as the best place to launch a career.";
    this.achievements1 = "In 2019, 2020 and 2021, Gartner stated that Deloitte was the No. 1 consulting service provider worldwide by revenue.";
    this.testimonials = " Their dedication to their mission and vision is truly remarkable. It's evident that they're driven by a clear purpose, which permeates every aspect of their work. Their commitment to their mission has not only made a significant impact on our project but has also influenced our broader community positively. We're grateful to be affiliated with a company that not only articulates its mission and vision but also demonstrates them through its actions. Thank you for your passion, integrity, and relentless pursuit of excellence  .";
    this.socialResponsibility = "We deliver strategy and implementation, from a business and technology view, to help you lead in the markets where you compete.";
  }
}