import { CastMember } from "@/data/movies";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

interface CastAndCrewProps {
  castAndCrew: CastMember[];
  showCount?: number;
}

export const CastAndCrew = ({ castAndCrew, showCount = 12 }: CastAndCrewProps) => {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'cast' | 'crew'>('all');

  // Filter cast and crew based on active tab
  const filteredMembers = castAndCrew.filter(member => {
    if (activeTab === 'cast') return member.role === 'actor';
    if (activeTab === 'crew') return member.role !== 'actor';
    return true;
  });

  // Show limited or all members based on state
  const displayedMembers = showAll ? filteredMembers : filteredMembers.slice(0, showCount);
  const hasMore = filteredMembers.length > showCount;

  const getRoleBadgeColor = (role: CastMember['role']) => {
    switch (role) {
      case 'actor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'director':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'producer':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'writer':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cinematographer':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'composer':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatRole = (role: CastMember['role']) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const castCount = castAndCrew.filter(member => member.role === 'actor').length;
  const crewCount = castAndCrew.filter(member => member.role !== 'actor').length;

  return (
    <section className="space-y-6">
      {/* Header with title and count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Top cast</h2>
          <span className="text-lg font-normal text-muted-foreground">
            {castAndCrew.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
          >
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-sm"
        >
          Edit
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('all')}
        >
          All ({castAndCrew.length})
        </Button>
        <Button
          variant={activeTab === 'cast' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('cast')}
        >
          Cast ({castCount})
        </Button>
        <Button
          variant={activeTab === 'crew' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('crew')}
        >
          Crew ({crewCount})
        </Button>
      </div>

      {/* Cast and Crew Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {displayedMembers.map((member) => (
          <Card
            key={member.id}
            className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="p-4 flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  {member.image ? (
                    <AvatarImage src={member.image} alt={member.name} />
                  ) : (
                    <AvatarFallback>
                      <User className="w-8 h-8 text-muted-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>

                {/* Role badge */}
                <div className="absolute -bottom-1 -right-1">
                  <Badge
                    variant="secondary"
                    className={`text-[10px] px-1.5 py-0.5 ${getRoleBadgeColor(member.role)}`}
                  >
                    {formatRole(member.role)}
                  </Badge>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {member.character}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Show more/less button */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronDown className="w-4 h-4 rotate-180" />
              </>
            ) : (
              <>
                Show All {filteredMembers.length} Members
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
};
