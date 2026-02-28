/**
 * Tests for the MetricCard component.
 * Validates rendering of titles, values, icons, and conditional change labels in both English and Spanish.
 */
import { render, screen } from "@testing-library/react";
import MetricCard from "@/app/components/shared/MetricCard";

describe("MetricCard", (): void => {
  it("renders title and value correctly", (): void => {
    render(
      <MetricCard
        title="Test Title"
        value="100"
        icon="solar:users"
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders with positive change", (): void => {
    render(
      <MetricCard
        title="Revenue"
        value="$5,000"
        change={15}
        icon="solar:wallet"
      />
    );

    expect(screen.getByText("15%")).toBeInTheDocument();
  });

  it("renders with negative change", (): void => {
    render(
      <MetricCard
        title="Bounce Rate"
        value="45%"
        change={-8}
        icon="solar:eye"
      />
    );

    expect(screen.getByText("8%")).toBeInTheDocument();
  });

  it("renders with default change label", (): void => {
    render(
      <MetricCard
        title="Users"
        value="500"
        change={10}
        icon="solar:users"
      />
    );

    expect(screen.getByText("vs mes anterior")).toBeInTheDocument();
  });

  it("renders with custom change label", (): void => {
    render(
      <MetricCard
        title="Users"
        value="500"
        change={10}
        changeLabel="vs yesterday"
        icon="solar:users"
      />
    );

    expect(screen.getByText("vs yesterday")).toBeInTheDocument();
  });
});