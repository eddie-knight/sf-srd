const DataSourceTypes = {
    'Armory': {
        'armor': [],
        'weapons': [
            'damage',
            {'weapon_category': []},
        ],    
    },
    'Market': {
        'items': ['type', 'level', 'price', 'bulk', 'capacity', 'usage', 'hands'],
        'goods_and_services': ['type', 'price', 'bulk'],
        'poisons': ['level', 'price', 'type', 'fort_save', 'track', 'onset', 'frequency', 'cure'],
        'medicinals': ['level', 'price'],
        'drugs': ['level', 'price', 'type', 'fort_save', 'addiction', 'track', 'effect'],    
    },
    'Character': {
        'spells': ['mystic_level', 'technomancer_level', 'witchwarper_level', {'effect_range': []}],
        'skills': ['untrained', 'ac_penalty', 'envoy', 'mechanic', 'mystic', 'operative', 'solarian', 'soldier', 'technomancer', 'biohacker', 'vanguard', 'witchwarper'],
        'classes': ['hit_points', 'stamina_points', 'key_ability_score', 'skills_per_level'],
        'feats': ['prerequisities', 'description', 'combat'],    
    }
}
export default DataSourceTypes
