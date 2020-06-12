const DataSourceTypes = {
    'armor': ['description'],
    'weapons': [
        'description',
        'damage',
        {'weapon_category': []},
    ],
    'spells': ['mystic_level', 'technomancer_level', 'witchwarper_level', {'effect_ranges': []}],
    'classes': ['hit_points', 'stamina_points', 'key_ability_score', 'skills_per_level'],
    'feats': ['prerequisities', 'short_description', 'combat'],
    'items': ['type', 'level', 'price', 'bulk', 'capacity', 'usage', 'hands'],
    'goods_and_services': ['type', 'price', 'bulk'],
    'poisons': ['level', 'price', 'type', 'fort_save', 'track', 'onset', 'frequency', 'cure'],
    'medicinals': ['level', 'price'],
    'drugs': ['level', 'price', 'type', 'fort_save', 'addiction', 'track', 'effect'],



}
export default DataSourceTypes
