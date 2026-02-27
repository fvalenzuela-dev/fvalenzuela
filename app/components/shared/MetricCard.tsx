"use client";

import React from "react";
import { Icon } from "@iconify/react";

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = "#22C55E",
  width = 120,
  height = 40,
}) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const isPositive = data[data.length - 1] >= data[0];

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`gradient-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#gradient-${color.replace("#", "")})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: string;
  iconColor?: string;
  sparklineData?: number[];
  sparklineColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel = "vs mes anterior",
  icon,
  iconColor = "text-primary",
  sparklineData,
  sparklineColor = "#22C55E",
}) => {
  const isPositive = change !== undefined ? change >= 0 : true;

  return (
    <div className="group bg-white dark:bg-dark rounded-xl p-6 border border-border dark:border-darkborder hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-lightprimary/50 dark:bg-white/5 ${iconColor}`}>
          <Icon icon={icon} width={24} />
        </div>
        {sparklineData && (
          <Sparkline data={sparklineData} color={sparklineColor} width={100} height={36} />
        )}
      </div>
      
      <p className="text-sm text-muted dark:text-darklink mb-1">{title}</p>
      
      <div className="flex items-end gap-3">
        <span className="text-2xl font-bold text-dark dark:text-white">
          {value}
        </span>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? "text-success" : "text-error"
          }`}>
            <Icon 
              icon={isPositive ? "solar:arrow-up-bold" : "solar:arrow-down-bold"} 
              width={14} 
            />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      {changeLabel && (
        <p className="text-xs text-muted dark:text-darklink mt-2">
          {changeLabel}
        </p>
      )}
    </div>
  );
};

export default MetricCard;
