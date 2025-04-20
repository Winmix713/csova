"use client";

import React, { useState, useCallback, useMemo, useRef, memo } from "react";
import { ArrowLeft, Save, Edit, Upload } from "lucide-react";
import Papa from "papaparse";
import { Match, LeagueData } from "../types";
import { MatchesTable } from "./MatchesTable";
import { StandingsTable } from "./StandingsTable";
import { FormTable } from "./FormTable";
import { calculateStandings, calculateTeamForms } from "../utils/calculations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LeagueDetailsProps {
  league: LeagueData;
  matches: Match[];
  onBack: () => void;
  onUpdateLeague: (updatedLeague: LeagueData) => void;
  onUpdateMatches: (matches: Match[]) => void;
}

export const LeagueDetails = memo(
  ({ league, matches, onBack, onUpdateLeague, onUpdateMatches }: LeagueDetailsProps) => {
    const [activeTab, setActiveTab] = useState<string>("matches");
    const [isEditing, setIsEditing] = useState(false);
    const [editedLeague, setEditedLeague] = useState(league);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const standings = useMemo(() => calculateStandings(matches), [matches]);
    const teamForms = useMemo(() => calculateTeamForms(matches), [matches]);

    const handleSave = useCallback(() => {
      onUpdateLeague(editedLeague);
      setIsEditing(false);
      setIsSaveDisabled(true);
    }, [editedLeague, onUpdateLeague]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setEditedLeague((prev) => ({ ...prev, [name]: value }));
      setIsSaveDisabled(false);
    }, []);

    const handleFileUpload = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse<Match>(file, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedMatches = result.data.filter((match): match is Match => {
              return (
                match.date &&
                match.home_team &&
                match.away_team &&
                !isNaN(Number(match.ht_home_score)) &&
                !isNaN(Number(match.ht_away_score)) &&
                !isNaN(Number(match.home_score)) &&
                !isNaN(Number(match.away_score))
              );
            });

            if (parsedMatches.length === 0) {
              alert("No valid matches found in the CSV file. Please check the format and try again.");
              return;
            }

            onUpdateMatches(parsedMatches);
            setDataLoaded(true);
            setIsSaveDisabled(false);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            alert("Failed to parse CSV file. Please check the format and try again.");
          },
        });
      },
      [onUpdateMatches]
    );

    const triggerFileUpload = useCallback(() => {
      fileInputRef.current?.click();
    }, []);

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="gap-2 bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Leagues
          </Button>
          <Button
            onClick={() => setIsEditing((prev) => !prev)}
            variant={isEditing ? "default" : "outline"}
            className={`gap-2 ${isEditing ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`}
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            {isEditing ? "Save" : "Edit League"}
          </Button>
        </div>

        {isEditing && (
          <div className="bg-black/20 rounded-xl p-6 space-y-6 border border-white/5">
            {/* League Editing Form */}
          </div>
        )}

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 bg-black/20 w-full rounded-xl">
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="standings">Standings</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="p-0 mt-6">
            <MatchesTable matches={matches} />
          </TabsContent>
          <TabsContent value="standings" className="p-0 mt-6">
            <StandingsTable standings={standings} />
          </TabsContent>
          <TabsContent value="form" className="p-*

